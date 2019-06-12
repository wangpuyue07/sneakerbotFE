var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.feedback_price = db.define('feedback_prices', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.UUID, allowNull: false},
        productId:{ type: Sequelize.UUID, allowNull: false},
        face:{type: Sequelize.STRING(16)},
        tag:{type: Sequelize.STRING(128)},
        topic: {type: Sequelize.STRING(64)},
        where: {type: Sequelize.STRING(128)},
        description: {type: Sequelize.STRING(2048)},
        storeId: {type: Sequelize.STRING(36)},
        img: {type: Sequelize.STRING(1024)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0},
        appliesTo: {type: Sequelize.STRING(512)}
    },{
        entityName: constants.entityTypes.feedback_prices,
        getterMethods : {
            topic: function () {
                return genUtils.PNAN.parse(this.getDataValue('topic'));
            },
            description: function () {
                var description = {price:{face:"",appliesTo:"",topic:{tags:"",tellUsMore:"",where:"",topicTag:""}}};
                description.price.face = this.getDataValue('face');
                description.price.appliesTo = genUtils.PNAN.parse(this.getDataValue('appliesTo'));
                description.price.topic.tags = genUtils.PNAN.parse(this.getDataValue('topic'));
                description.price.topic.tellUsMore = this.getDataValue('description');
                description.price.topic.where = this.getDataValue('where');
                description.price.topic.topicTag = this.getDataValue('tag');
                return JSON.stringify(description);
            },
            id: function () {
                return this.getDataValue('cid');
            },
            sku: function () {
                return this.getDataValue('productId');
            },
            tags: function () {
                return ["price"];
            },
            type: function () {
                return 'feedback'
            }

        },
        setterMethods : {
            topic: function (val) {
                this.setDataValue('topic', genUtils.PNAN.stringify(val));
            },
            appliesTo: function (val) {
                this.setDataValue('appliesTo', genUtils.PNAN.stringify(val));
            }
        }
    });
};