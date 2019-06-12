
var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');
var _ = require('lodash');

module.exports = function (db, models) {
    models.suggestion = db.define('newsuggestions', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId: { type: Sequelize.UUID, allowNull: false },
        productId: { type: Sequelize.UUID, allowNull: true },
        storeId:{ type: Sequelize.UUID, allowNull: true },
        product_type:{type:Sequelize.STRING(128), allowNull:true},
        style_cut:{type:Sequelize.STRING(128), allowNull:true},
        color:{type:Sequelize.STRING(255), allowNull:true},
        description: {type: Sequelize.STRING(2048), allowNull: true},
        images: {type: Sequelize.STRING(1024), allowNull: true},
        type:{type:Sequelize.STRING(64), allowNull:true},
        tag:{type: Sequelize.STRING(128)},
        topic: {type: Sequelize.STRING(64)},
        appliesTo: {type: Sequelize.STRING(512)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.INTEGER, allowNull:false,defaultValue:0}
    }, {
        entityName: constants.entityTypes.suggestions,
        mapFromContext: ['staffId'],
        getterMethods : {
            images: function () {
                return genUtils.PNAN.parse(this.getDataValue('images'));
            },
            info: function () {
                var info = {};
                info.productType = this.getDataValue('product_type');
                info.styleCut = genUtils.PNAN.parse(this.getDataValue('style_cut'));
                info.color = genUtils.PNAN.parse(this.getDataValue('color'));
                info.description = this.getDataValue('description');
                return JSON.stringify(info);
            },
            id: function () {
                return this.getDataValue('cid');
            },
            sku: function () {
                return this.getDataValue('productId');
            },
            tags: function () {
                return _.compact(genUtils.PNAN.parse(this.getDataValue('topic') + "|" + this.getDataValue('tag') + "|" + this.getDataValue('appliesTo')));
            },
            type: function () {
                return 'suggestion'
            },
            topic: function () {
                return this.getDataValue(genUtils.PNAN.parse(this.getDataValue('topic')));
            }
        },
        setterMethods : {
            images: function (val) {
                this.setDataValue('images', genUtils.PNAN.stringify(val));
            },
            info: function (val) {
                var myVal = JSON.parse(val);
                if (!val) return;
                this.setDataValue('product_type', myVal.productType);
                this.setDataValue('style_cut', genUtils.PNAN.stringify(myVal.styleCut));
                this.setDataValue('color', genUtils.PNAN.stringify(myVal.color));
                this.setDataValue('description', myVal.description);
            },
            topic: function (val) {
                this.setDataValue('topic', genUtils.PNAN.stringify(val));
            },
            appliesTo: function (val) {
                this.setDataValue('appliesTo', genUtils.PNAN.stringify(val));
            }
        }
    });
};
