var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../constants');

module.exports = function (db, models) {
    models.products = db.define('products', {
        id: { type: Sequelize.UUID, primaryKey: true },
        parentSku: {type: Sequelize.STRING(300), allowNull: true},
        sku: {type: Sequelize.STRING(300), allowNull: false},
        description: {type: Sequelize.STRING(300)},
        image: {type: Sequelize.STRING(300)},

        //Attributes
        size: {type: Sequelize.STRING(300)},
        colour: {type: Sequelize.STRING(300)},
        fit: {type: Sequelize.STRING(300)},
        category: {type: Sequelize.STRING(300)},
        brand: {type: Sequelize.STRING(300)},
        rrp: {type: Sequelize.DECIMAL(10,2)}
    }, {
        entityName: constants.entityTypes.product
    });
};