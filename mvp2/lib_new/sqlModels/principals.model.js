var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.principals = db.define('principals', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        username: {type: Sequelize.STRING(255), allowNull: false},
        passwordHash: {type: Sequelize.STRING(255), allowNull: false},
        googleId: {type: Sequelize.STRING(36), allowNull: true},
        type:{type:Sequelize.STRING(36), allowNull:true},
        createdAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
        updatedAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
        deleted:{type:Sequelize.BOOLEAN, allowNull:false,defaultValue:false},
        active:{type:Sequelize.BOOLEAN, allowNull:true, defaultValue:true},
        creatorId:{type:Sequelize.STRING(36)}
    }, {
        entityName: constants.entityTypes.principals
    });
};