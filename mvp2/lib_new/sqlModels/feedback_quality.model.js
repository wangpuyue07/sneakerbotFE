var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.feedback_quality = db.define('feedback_qualitys', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.UUID, allowNull: false},
        productId:{ type: Sequelize.UUID, allowNull: false},
        face:{type: Sequelize.STRING(16)},
        tag:{type: Sequelize.STRING(300),allowNull:false},
        topic: {type: Sequelize.STRING(64)},
        when: {type: Sequelize.STRING(128)},
        where: {type: Sequelize.STRING(128)},
        what: {type: Sequelize.STRING(128)},
        description: {type: Sequelize.STRING(2048)},
        storeId: {type: Sequelize.STRING(36)},
        img: {type: Sequelize.STRING(1024)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0},
        appliesTo: {type: Sequelize.STRING(512)}
    },{
        entityName: constants.entityTypes.feedback_qualitys,
        getterMethods : {
            topic: function () {
                return genUtils.PNAN.parse(this.getDataValue('topic'));
            },
            description: function () {
                var description = {quality:{face:"",appliesTo:"",topic:{tags:"",tellUsMore:"",where:"",when:"",what:"",img:"",topicTag:""}}};
                description.quality.face = this.getDataValue('face');
                description.quality.appliesTo = genUtils.PNAN.parse(this.getDataValue('appliesTo'));
                description.quality.topic.tags = genUtils.PNAN.parse(this.getDataValue('topic'));
                description.quality.topic.tellUsMore = this.getDataValue('description');
                // description.quality.topic.where = genUtils.PNAN.parse(this.getDataValue('where'));
                description.quality.topic.where = this.getDataValue('where');
                // description.quality.topic.when = genUtils.PNAN.parse(this.getDataValue('when'));
                description.quality.topic.when = this.getDataValue('when');
                description.quality.topic.what = this.getDataValue('what');
                description.quality.topic.img = this.getDataValue('img');
                description.quality.topic.topicTag = this.getDataValue('tag');
                return JSON.stringify(description);
            },
            id: function () {
                return this.getDataValue('cid');
            },
            sku: function () {
                return this.getDataValue('productId');
            },
            tags: function () {
                return ["quality"];
            },
            type: function () {
                return 'feedback'
            }
        },
        setterMethods : {
            topic: function (val) {
                this.setDataValue('topic', genUtils.PNAN.stringify(val));
            },
            // where: function (val) {
            //     this.setDataValue('where', genUtils.PNAN.stringify(val));
            // },
            // when: function (val) {
            //     this.setDataValue('when', genUtils.PNAN.stringify(val));
            // },
            appliesTo: function (val) {
                this.setDataValue('appliesTo', genUtils.PNAN.stringify(val));
            }
        }
    });
};