var service = require('../application/serviceUtils');
var constants = require('../application/constants');
var Sequelize = require('sequelize');

var models = {};

exports.create = function (db) {
    require('./a_activityCount.model')(db, models);
    require('./a_classifyfaceCount.model')(db, models);
    require('./a_staffActivityCount.model')(db, models);
    require('./comments.model')(db, models);
    require('./images.model')(db, models);
    require('./applies.model')(db, models);
    require('./feedback_fit.model')(db, models);
    require('./feedback_price.model')(db, models);
    require('./feedback_quality.model')(db, models);
    require('./feedback_stock.model')(db, models);
    require('./feedback_style.model')(db, models);
    require('./notifications.model')(db, models);
    require('./principals.model')(db, models);
    require('./product_Info.model')(db, models);
    require('./products.model')(db, models);
    require('./staff.model')(db, models);
    require('./store.model')(db, models);
    require('./suggestions.model')(db, models);
    require('./vote.model')(db, models);
    require('./newPrincipals.model')(db, models);
    require('./organisations.model')(db, models);
    require('./requestFeedback.model')(db, models);
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
                        lookup.cache.set(this.Model.options.entityName, res.cid, res.get());
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
                            lookup.cache.remove(this.Model.options.entityName, res.cid);
                        } else {
                            lookup.cache.set(this.Model.options.entityName, res.cid, res.get());
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