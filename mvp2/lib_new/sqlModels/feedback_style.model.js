var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.feedback_style = db.define('feedback_styles', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.STRING(36), allowNull: false},
        productId:{ type: Sequelize.STRING(36), allowNull: false},
        face:{type: Sequelize.STRING(16)},
        tag:{type: Sequelize.STRING(128)},
        topic: {type: Sequelize.STRING(64)},
        description: {type: Sequelize.STRING(2048)},
        storeId: {type: Sequelize.STRING(36)},
        img: {type: Sequelize.STRING(1024)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0},
        appliesTo: {type: Sequelize.STRING(512)},
        what:{type: Sequelize.STRING(128)},
    },{
        entityName: constants.entityTypes.feedback_styles,
        getterMethods : {
            topic: function () {
                return genUtils.PNAN.parse(this.getDataValue('topic'));
            },
            description: function () {
                var description = {style:{face:"",appliesTo:"",topic:{tags:"",tellUsMore:"",img:"",topicTag:""}}};
                description.style.face = this.getDataValue('face');
                description.style.appliesTo = genUtils.PNAN.parse(this.getDataValue('appliesTo'));
                description.style.topic.tags = genUtils.PNAN.parse(this.getDataValue('topic'));
                description.style.topic.what = this.getDataValue('what');
                description.style.topic.tellUsMore = this.getDataValue('description');
                description.style.topic.img = this.getDataValue('img');
                description.style.topic.topicTag = this.getDataValue('tag');
                return JSON.stringify(description);
            },
            id: function () {
                return this.getDataValue('cid');
            },
            sku: function () {
                return this.getDataValue('productId');
            },
            tags: function () {
                return ["style"];
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