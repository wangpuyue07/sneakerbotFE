var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.feedback_stock = db.define('feedback_stocks', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.UUID, allowNull: false},
        productId:{ type: Sequelize.UUID, allowNull: false},
        face:{type: Sequelize.STRING(16)},
        tag:{type: Sequelize.STRING(128)},
        topic: {type: Sequelize.STRING(64)},
        overstocked: {type: Sequelize.STRING(1024)},
        understocked: {type: Sequelize.STRING(1024)},
        stockHighTUM: {type: Sequelize.STRING(2048)},
        stockLowTUM: {type: Sequelize.STRING(2048)},
        storeId: {type: Sequelize.STRING(36)},
        img: {type: Sequelize.STRING(1024)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0},
        appliesTo: {type: Sequelize.STRING(512)},
        description: {type: Sequelize.STRING(2048)}
    },{
        entityName: constants.entityTypes.feedback_stocks,
        getterMethods : {
            topic: function () {
                return genUtils.PNAN.parse(this.getDataValue('topic'));
            },
            description: function () {
                var description = {stock:{face:"",appliesTo:"",topic:{tags:"",tellUsMore:"",overstocked:"",understocked:"",stockLowTUM:"",stockHighTUM:"",topicTag:""}}};
                description.stock.face = this.getDataValue('face');
                description.stock.appliesTo = genUtils.PNAN.parse(this.getDataValue('appliesTo'));
                description.stock.topic.tags = genUtils.PNAN.parse(this.getDataValue('topic'));
                description.stock.topic.tellUsMore = this.getDataValue('description');
                description.stock.topic.overstocked = this.getDataValue('overstocked');
                description.stock.topic.understocked = this.getDataValue('understocked');
                description.stock.topic.stockHighTUM = this.getDataValue('stockHighTUM');
                description.stock.topic.stockLowTUM = this.getDataValue('stockLowTUM');
                description.stock.topic.topicTag = this.getDataValue('tag');
                return JSON.stringify(description);
            },
            id: function () {
                return this.getDataValue('cid');
            },
            sku: function () {
                return this.getDataValue('productId');
            },
            tags: function () {
                return ["stock"];
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