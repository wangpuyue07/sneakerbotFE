var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.products = db.define('newproducts', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        sku: {type: Sequelize.STRING(36), allowNull: false},
        description: {type: Sequelize.STRING(128)},
        category: {type: Sequelize.STRING(64)},
        brand: {type: Sequelize.STRING(64)},
        active:{type:Sequelize.INTEGER, allowNull:false, defaultValue:1},
        deleted:{type:Sequelize.INTEGER, allowNull:false, defaultValue:0},
        createdAt:{type:Sequelize.DATE, allowNull:true},
        updatedAt:{type:Sequelize.DATE, allowNull:true},
        fbupdateAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW}
    }, {
        entityName: constants.entityTypes.products
    });
};