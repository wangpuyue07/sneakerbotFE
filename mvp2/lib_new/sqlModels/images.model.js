var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.images = db.define('images', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.UUID, allowNull: false},
        subjectId:{ type: Sequelize.UUID, allowNull: false},
        image_url: {type: Sequelize.STRING(255)},
        createdAt:{type:Sequelize.DATE, allowNull:false,defaultValue:Sequelize.NOW},
        updatedAt:{type:Sequelize.DATE, allowNull:false,defaultValue:Sequelize.NOW},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:false},
    },{
        entityName: constants.entityTypes.images
    });
};