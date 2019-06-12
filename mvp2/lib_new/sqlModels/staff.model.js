
var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.staffs = db.define('staffs', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        names:{ type: Sequelize.STRING(300), allowNull:false},
        userId:{ type: Sequelize.UUID},
        email:{ type: Sequelize.STRING(300)},
        barCode: {type: Sequelize.STRING(100), allowNull: true},
        permission_level: {type: Sequelize.INTEGER, allowNull: true},
        apiKey: {type: Sequelize.STRING(300)},
        role:{type: Sequelize.STRING(100)},
        short_name:{type: Sequelize.STRING(128)},
        role_ab:{type: Sequelize.STRING(10)},
        storeId:{type: Sequelize.STRING(36)},
        active:{type:Sequelize.INTEGER, allowNull:false, defaultValue:1},
        deleted:{type:Sequelize.INTEGER, allowNull:false, defaultValue:0},
        createdAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
        updatedAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
        creatorId:{type: Sequelize.STRING(36), allowNull: true}
    }, {
        entityName: constants.entityTypes.staffs,
        getterMethods: {
            names: function () {
                if (!this.getDataValue('names')) return {};
                return JSON.parse(this.getDataValue('names'));
            },
            id: function(){
                return this.getDataValue('cid');
            }
        },
        setterMethods: {
            names: function (val) {
                this.setDataValue('names', JSON.stringify(val));
            }
        }
    }, {
        entityName: constants.entityTypes.staffs
    });
};

