var service = require('../application/serviceUtils');
var constants = require('../constants');
var Sequelize = require('sequelize');

var models = {};

exports.create = function (db) {
    customizeModelDefiner(db);
    require('./organisations.model.js')(db, models);
    require('./spots.model.js')(db, models);
    require('./principals.model.js')(db, models);
    require('./passwordResets.model.js')(db, models);
    require('./activities.model.js')(db, models);
    require('./feedback.model.js')(db, models);
    require('./products.model.js')(db, models);
    require('./notifications.model.js')(db, models);
    require('./requests.model.js')(db, models);
    applyGlobalHooks(models);
    return models;
};

function customizeModelDefiner(db) {
    (function () {
        var original_define = db.define;
        db.define = function () {
            var model = arguments[1];
            var options = arguments[2] || {};
            if (options.enablePriority) {
                model.priority = {type: Sequelize.INTEGER(4), allowNull: true};
            }
            model.deleted = {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0};
            model.creatorId = {type: Sequelize.STRING, allowNull: true };
            return original_define.apply(this, [arguments[0], model, options]);
        };
    })();
}

function applyGlobalHooks(models) {
    for (var m  in models) {
        if (!models.hasOwnProperty(m)) continue;

        (function () {
            var original_create = models[m].create;
            models[m].create = function () {
                arguments[0] = service.stripContext(arguments[0]);
                return original_create.apply(this, arguments).then(function (res) {
                    if (this.Model.options.enableLookup) {
                        lookup.cache.set(this.Model.options.entityName, res.id, res.get());
                    }
                    return res;
                })
            };

            var original_updateAttributes = models[m].Instance.prototype.updateAttributes;
            models[m].Instance.prototype.updateAttributes = function () {
                arguments[0] = service.stripContext(arguments[0]);
                return original_updateAttributes.apply(this, arguments).then(function (res) {
                    if (this.Model.options.enableLookup) {
                        if (res.deleted) {
                            lookup.cache.remove(this.Model.options.entityName, res.id);
                        } else {
                            lookup.cache.set(this.Model.options.entityName, res.id, res.get());
                        }
                    }
                    return res;
                })
            };

            var original_find = models[m].find;
            models[m].find = function () {
                if (arguments[0].where) {
                    arguments[0].where = service.stripContext(arguments[0].where);
                }
                return original_find.apply(this, arguments);
            };

            var original_findAll = models[m].findAll;
            models[m].findAll = function () {
                if (arguments[0].where) {
                    arguments[0].where = service.stripContext(arguments[0].where);
                }
                return original_findAll.apply(this, arguments);
            };

        })();
    }
}