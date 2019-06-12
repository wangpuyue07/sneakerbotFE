var sql = require('../application/providers/sqlClient');
var events = require('./eventBroker');
var service = require('./serviceUtils');
var squel = require('squel');
var Joi = require('joi');
var util = require('util');
var Promise = require('bluebird');
var _ = require('lodash');

/**
 * @param {string} entityType
 */
module.exports = Persistence = function (entityType) {
    var _sqlModel;
    Object.defineProperty(this, 'sqlModel', {
        get: function () {
            if (_sqlModel) return _sqlModel;
            _sqlModel = _.find(sql.models, 'options.entityName', entityType);
            if (!_sqlModel) throw new Error('entityName has not been defined in the sql model ' +
                'OR the model has not been initialized.');
            return _sqlModel;
        }
    });
    this.entityType = entityType;
    this.events = {
        onCreated: [this.entityType, 'created'],
        onUpdated: [this.entityType, 'updated'],
        onDeleted: [this.entityType, 'deleted']
    };
};

function mapValuesFromContext(sqlModel, command) {
    var mapFromContext = sqlModel.options['mapFromContext'];
    if (Array.isArray(mapFromContext)) {
        mapFromContext.forEach(x => {
            command[x] = command._userContext[x];
        });
    }
}
/**
 * @param command
 * @param options
 * @param [options.priority] {Object} When provided the priority will automatically be assigned based on the discriminator.
 * @param options.priority.discriminator
 * @param [options.priority.discriminatorResolver] {function}
 * @param options.uniqueQuery {Object} A query which describes the item uniquely.
 * @param options.event {Array} Qualified event path.
 * @param options.disableEvent {Boolean} Turn off raising event.
 * @returns {*}
 */
Persistence.prototype.createItem = function (command, options) {
    var that = this;
    options = options || {};
    return new Promise((resolve, reject) => {
        if (options.uniqueQuery) {
            that.sqlModel.find({where: options.uniqueQuery}).then(res => {
                if (res) reject(new service.ValidationError('Item already exists.'));
                resolve();
            });
        } else {
            resolve();
        }
    }).then(() => {
        if (Object.keys(that.sqlModel.attributes).indexOf('priority') === -1) return;
        if (!options.priority) return that.getMaxPriority();
        var value = options.priority.discriminatorResolver ? options.priority.discriminatorResolver(command) : command[options.priority.discriminator];
        return that.getMaxPriority(options.priority.discriminator, value || null);
    }).then(maxPosition => {
        if (maxPosition !== undefined) command.priority = maxPosition + 1;
        if (!command._userContext){command._userContext = {id: 'anonymous'}}
        else{
            mapValuesFromContext(that.sqlModel, command);
        }
        if(!command.creatorId){command.creatorId = command._userContext.staffId?command._userContext.staffId:command._userContext.id};
        return that.sqlModel.create(service.stripContext(command));
    }).then(res => {

        if(!options.disableEvent) events.emit(that.events.onCreated, res.get(), null, command._userContext);
        return res.get();
    }).catch((err)=>{console.log(err)});
};
/**
 *
 * @param command
 * @param options {object}
 * @param options.responseObject {object}
 * @returns {*}
 */
Persistence.prototype.getItem = function (command, options) {
    command.deleted = 0;
    delete command._userContext;
    if(command.id){
       command.cid = command.id;
       delete command.id;
    };
    if(command.all){
        delete command.all;
        delete command.deleted;
    }
    var that = this;
    if (!command) return new Promise((resolve) => {
        resolve(null);
    });
    options = options || {};
    return that.sqlModel.find({where: command}).then(x => {
        if(x === null) return options.responseObject = null;
        return options.responseObject ? options.responseObject({obj: x, _userContext: command._userContext}) : x.get();
    });
};

/**
 *
 * @param command
 * @param options
 * @param options.event {Array} Qualified array path.
 */
Persistence.prototype.updateItem = function (command, options) {


    var that = this;
    options = options || {};
    if (Object.keys(command).filter(x => {
            return (x !== 'cid') && (x.indexOf('_') !== 0)
        }).length === 0)
        throw new service.ValidationError('Command has no values to update with.');

    var previous, id = command.id ? command.id : command.cid;
    return that.sqlModel.find({where: {cid: id, deleted: 0}}).then(res => {
        if (!res) throw new service.ValidationError('Cannot find the given item.');
        previous = JSON.parse(JSON.stringify(res.get()));
        return res.updateAttributes(command).catch(asd=>console.log(asd));
    }).then(res => {
        events.emit(that.events.onUpdated, res.get(), previous);
        return {current: res.get(), previous: previous};
    }).catch(sql.db.UniqueConstraintError, e => {
        throw new service.ValidationError('Another item with the values you have given exists.');
    });
};


/**
 *
 * @param command
 * @param options
 * @returns {*}
 */
Persistence.prototype.listItems = function (command, options) {
    var that = this;
    command = command || {};
    //command.orderBy = command.orderBy=='createdAt'?'updatedAt':command.orderBy;
    command.orderBy = command.orderBy||'updatedAt';
    command.direction = command.direction || 'desc';
    command.page = command.page || 0;
    command.limit = command.limit || 20;
    if(command.since){
        command.createdAt = {gt: command.since};
        delete command.since;
    }
    var where = _.omit(command, ['page', 'limit', 'direction', 'orderBy']);
    where.deleted = 0;
    options = options || {};
    if(command.all){
       delete where.all;
       delete where.deleted;
    }
    if (command.orderBy === 'priority' && command.direction === 'asc') {
        command.orderBy = '-priority';
        command.direction = 'desc';
    }
    delete command.createdAt;
    var listCommand = {
        order: command.orderBy + ' ' + command.direction,
        offset: command.page * command.limit,
        limit: command.limit,
        where: where
    };
    return that.sqlModel.findAll(listCommand).then(res => {
        return Promise.all(res.map(item => {
            return new Promise(resolve => {
                var obj = item.get();
                if (options.responseObject && !command._raw) {
                    resolve(options.responseObject({obj: obj, context: options.context}));
                } else {
                    resolve(obj);
                }
                resolve();
            });
        }));
    }).catch(err=>{console.log(err)})
};

/**
 *
 * @param command
 * @param options
 * @param options.event {Array} The qualified event array.
 * @returns {*}
 */
Persistence.prototype.deleteItem = function (command, options) {
    var that = this;
    if(command.id){
        command.cid = command.id;
        delete command.id;
    };
    delete command._userContext;
    command.deleted=0;
    return that.sqlModel.find({where: command}).then(res => {
        if (!res) throw new service.ValidationError('Cannot find the given item.');
        return res.updateAttributes({deleted: 1}, ['deleted']).then(res => {
            events.emit(that.events.onDeleted, {cid: command.cid,pre:res});
        })
    }).catch(err=>{console.log(err)});
};
/**
 *
 * @param command
 * @param options
 * @param options.event {Array} The qualified event array.
 * @returns {*}
 */
Persistence.prototype.deleteItems = function (command, options) {
    var that = this;
    if(command.id){
        command.cid = command.id;
        delete command.id;
    };
    delete command._userContext;
    command.deleted=0;
    // return that.sqlModel.find({where: command}).then(res => {
    //     if (!res) throw new service.ValidationError('Cannot find the given item.');
    //     return res.updateAttributes({deleted: 1}, ['deleted']).then(res => {
    //         events.emit(that.events.onDeleted, {cid: command.cid});
    //     })
    // }).catch(err=>{console.log(err)});

    return that.sqlModel.findAll({where: command}).then(res => {
        if (!res) throw new service.ValidationError('Cannot find the given item.');
        return Promise.all(res.map(item => {
            return new Promise(resolve => {

                resolve(item.updateAttributes({deleted: 1}, ['deleted']));
                //
                //
                // var obj = item.get();
                // if (options.responseObject && !command._raw) {
                //     resolve(options.responseObject({obj: obj, context: options.context}));
                // } else {
                //     resolve(obj);
                // }
                // resolve();
            });
        })).then(res=>{
            events.emit(that.events.onDeleted, res);
        });
    });
};

/**
 * Gets the maximum possible priority, used for incrementing the priority when creating a new item.
 * @param [discriminator]
 * @param [discriminatorValue]
 * @returns {*}
 */
Persistence.prototype.getMaxPriority = function (discriminator, discriminatorValue) {
    var that = this;
    var tableName = that.sqlModel.name;
    var maxQuery = squel.select().from(tableName).field('coalesce(max(priority), 0)', 'max');
    if (discriminator) {
        var equals = discriminatorValue === null ? ' is ?' : ' = ?';
        maxQuery.where(discriminator + equals, discriminatorValue);
    }
    maxQuery.limit(1);
    return sql.db.query(maxQuery.toString(), {type: sql.db.QueryTypes.SELECT}).then(max => {
        return max[0] ? max[0].max : 0;
    });
};


/**
 *
 * @param command
 * @param command.priority
 * @param command.discriminator
 * @returns {Function|*}
 */
Persistence.prototype.changePriority = function (command) {
    var that = this;
    var rules = {
        id: Joi.number().integer().required(),
        priority: Joi.number().integer().required().min(0).default(1, 'Make top priority if none given.'),
        discriminator: Joi.string().allow(null)
    };
    service.validateSync(command, rules);
    var tableName = that.sqlModel.name;
    var itemQuery = squel.select().from(tableName).field('priority').where('id = ?', command.id);
    if (command.discriminator) itemQuery.field(command.discriminator, 'discriminator');
    var sourcePriority, discriminatorValue, equals;
    return sql.db.query(itemQuery.toString(), {type: sql.db.QueryTypes.SELECT}).then(item => {
        sourcePriority = item[0] ? item[0].priority : 0;
        discriminatorValue = item[0] ? item[0].discriminator : null;

        var minAndMaxQuery = squel.select().from(tableName)
            .field('min(priority)', 'min')
            .field('max(priority)', 'max');
        if (command.discriminator) {
            equals = discriminatorValue === null ? ' is ?' : ' = ?';
            minAndMaxQuery.where(command.discriminator + equals, discriminatorValue);
        }
        return sql.db.query(minAndMaxQuery.toString(), {type: sql.db.QueryTypes.SELECT});
    }).then(function (minMax) {
        if (sourcePriority === command.priority) return;
        var min = minMax[0] ? minMax[0].min : 0;
        var max = minMax[0] ? minMax[0].max : 0;
        if (command.priority > max || command.priority < min) throw new service.ValidationError('The desired priority is outside of the min or max priority for this item');
        var movingUp = sourcePriority < command.priority;
        var shuffleQuery;
        if (movingUp) {
            shuffleQuery = squel.update()
                .table(tableName)
                .set('priority=priority-1').where('priority <= ? and priority > ?', command.priority, sourcePriority);
        } else {
            shuffleQuery = squel.update()
                .table(tableName)
                .set('priority=priority+1').where('priority >= ? and priority < ?', command.priority, sourcePriority);
        }
        if (command.discriminator) shuffleQuery.where(command.discriminator + equals, discriminatorValue);
        var updateQuery = squel.update().table(tableName).set('priority', command.priority).where('cid=?', command.id);
        var combined = [shuffleQuery.toString(), updateQuery.toString()].join(';') + ';';
        return sql.db.query(combined);
    })
};

Persistence.prototype.batchFetch = function (batchSize, fn) {
    var that = this;
    (function page(offset, limit) {
        var requestLength = 0;
        that.sqlModel.findAll({where: {deleted: 0}, limit: limit, offset: offset}).then(items => {
            requestLength = items.length;
            return fn(items);
        }).then(function () {
            if (limit === requestLength) page(offset + limit, limit)
        })
    }(0, 50));
};

