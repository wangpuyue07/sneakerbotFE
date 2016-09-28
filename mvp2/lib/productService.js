var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('./application/persistence');
var genUtils = require('./application/genUtils');
var constants = require('./constants');
var service = require('./application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.product);
var sql = require('../lib/application/providers/sqlClient');
var util = require('util');

exports.createProduct = function (command) {
    var rules = {
        parentSku: Joi.string().required(),
        sku: Joi.string(),
        description: Joi.string(),
        image: Joi.string()
    };
    service.validateSync(command, rules);
    command.id = genUtils.createTimeUuid();
    command.organisationId = command._userContext.organisation.id;
    return persistence.createItem(command);
};

exports.updateProduct = function (command) {
    var rules = {
        id: Joi.string().guid().required(),
        sku: Joi.string(),
        parentSku: Joi.string(),
        image: Joi.string()
    };
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.getProduct = function (command) {
    var rules = {
        sku: Joi.string()
    };
    command = service.validateSync(command, rules);
    return exports.getProductById([command.sku]).then(x => {
        return x[0];
    })
};

exports.getRandomProduct = function () {
    var random = Math.round(Math.random() * (6000 - 1) + 1);
    var query = util.format("SELECT parentSku from products limit %s,1;", random);
    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        return exports.getProductById([res[0].parentSku]);
    });
};

exports.listProducts = function (command) {
    var query = "SELECT parentSku as sku, description, category, " +
        "GROUP_CONCAT(" + getGroupConcatString() + " ORDER BY `sku` ASC SEPARATOR '; ') AS variations " +
        "FROM products ";
    if (command.ids) query += "WHERE `parentSku` in('" + command.ids.join("','") + "') ";
    query += "GROUP BY parentSku, category, description;";

    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        return res.map(x => {
            if (!x.variations) {
                x.variations = [];
                return x;
            }
            x.variations = x.variations.split(';').map(v => {
                var fields = v.split(',');
                var variation = {};
                fields.forEach(f => {
                    var tokens = f.split('|');
                    variation[tokens[0].trim()] = tokens[1];
                });
                return variation;
            });
            return x;
        })
    });

};

exports.getProductById = function (ids) {
    return exports.listProducts({ids: ids});
};

function getGroupConcatString() {
    var groups = ['sku', 'image', 'size', 'colour', 'fit', 'brand', 'rrp'];
    return groups.map(x => {
        return util.format(" ',%s|', COALESCE(%s, '')", x, x);
    }).join(',').replace(/^ ',/, "'");
}

exports.deleteProduct = function (command) {
    service.validateUuidId(command);
    return persistence.deleteItem(command);
};

/*

 */