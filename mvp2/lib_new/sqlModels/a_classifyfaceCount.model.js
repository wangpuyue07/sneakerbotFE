var Sequelize = require('sequelize');
var constants = require('../application/constants');
module.exports = function (db, models) {
    models.a_classifyfaceCount = db.define('a_classifyfaceCounts', {
        cid: {type: Sequelize.UUID, primaryKey: true},
        productId: {type: Sequelize.STRING(36)},
        quality_damagedbroken_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        quality_fabric_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        quality_fabric_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        quality_general_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        quality_general_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitssmall_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitslarge_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitstrue_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitssmall_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitslarge_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_fitstrue_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_general_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        fit_general_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_colourpattern_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_colourpattern_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_design_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_design_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_fabric_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_fabric_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_general_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        style_general_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_tooexpensive_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_tooexpensive_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_toocheap_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_toocheap_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_incorrectprice_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_incorrectprice_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_general_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        price_general_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_toohigh_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_toohigh_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_toolow_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_toolow_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_general_happy: {type: Sequelize.INTEGER(16), defaultValue: 0},
        stock_general_sad: {type: Sequelize.INTEGER(16), defaultValue: 0},
        voteNum:{type: Sequelize.INTEGER(16), defaultValue: 0},
        commentNum:{type: Sequelize.INTEGER(16), defaultValue: 0},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.INTEGER, allowNull:true,defaultValue:0},
        //add by mia
        quality_finishings_sad:{type: Sequelize.INTEGER(16), defaultValue: 0},
        quality_finishings_happy:{type: Sequelize.INTEGER(16), defaultValue: 0},
    }, {
        entityName: constants.entityTypes.a_classifyfaceCounts,
        getterMethods: {
            fit_total: function () {
                return this.getDataValue('fit_fitssmall_happy') + this.getDataValue('fit_fitslarge_happy') + this.getDataValue('fit_fitstrue_happy') + this.getDataValue('fit_general_happy') + this.getDataValue('fit_fitssmall_sad') + this.getDataValue('fit_fitslarge_sad') + this.getDataValue('fit_fitstrue_sad') + this.getDataValue('fit_generral_sad')
            }, fit_happy: function () {
                return this.getDataValue('fit_fitssmall_happy') + this.getDataValue('fit_fitslarge_happy') + this.getDataValue('fit_fitstrue_happy') + this.getDataValue('fit_general_happy');
            }, fit_sad: function () {
                return this.getDataValue('fit_fitssmall_sad') + this.getDataValue('fit_fitslarge_sad') + this.getDataValue('fit_fitstrue_sad') + this.getDataValue('fit_generral_sad');
            }, quality_total: function () {
                return this.getDataValue('quality_fabric_happy') + this.getDataValue('quality_general_happy') + this.getDataValue('quality_damagedbroken_sad') + this.getDataValue('quality_fabric_sad') + this.getDataValue('quality_general_sad')+ this.getDataValue('quality_finishings_happy')+ this.getDataValue('quality_finishings_sad');
            }, quality_happy: function () {
                return this.getDataValue('quality_fabric_happy') + this.getDataValue('quality_general_happy') + this.getDataValue('quality_finishings_happy');
            }, quality_sad: function () {
                return this.getDataValue('quality_damagedbroken_sad') + this.getDataValue('quality_fabric_sad') + this.getDataValue('quality_general_sad') + this.getDataValue('quality_finishings_sad');
            }, style_total: function () {
                return this.getDataValue('style_colourpattern_happy') + this.getDataValue('style_design_happy') + this.getDataValue('style_fabric_happy') + this.getDataValue('style_general_happy');
            }, style_happy: function () {
                return this.getDataValue('style_colourpattern_happy') + this.getDataValue('style_design_happy') + this.getDataValue('style_fabric_happy') + this.getDataValue('style_general_happy') + this.getDataValue('style_colourpattern_sad') + this.getDataValue('style_design_sad') + this.getDataValue('style_fabric_sad') + this.getDataValue('style_general_sad');
            }, style_sad: function () {
                return this.getDataValue('style_colourpattern_sad') + this.getDataValue('style_design_sad') + this.getDataValue('style_fabric_sad') + this.getDataValue('style_general_sad');
            }, price_total: function () {
                return this.getDataValue('price_tooexpensive_happy') + this.getDataValue('price_toocheap_happy') + this.getDataValue('price_incorrectprice_happy') + this.getDataValue('price_general_happy') + this.getDataValue('price_tooexpensive_sad') + this.getDataValue('price_toocheap_sad') + this.getDataValue('price_incorrectprice_sad') + this.getDataValue('price_general_sad');
            }, price_happy: function () {
                return this.getDataValue('price_tooexpensive_happy') + this.getDataValue('price_toocheap_happy') + this.getDataValue('price_incorrectprice_happy') + this.getDataValue('price_general_happy');
            }, price_sad: function () {
                return this.getDataValue('price_tooexpensive_sad') + this.getDataValue('price_toocheap_sad') + this.getDataValue('price_incorrectprice_sad') + this.getDataValue('price_general_sad');
            }, stock_total: function () {
                return this.getDataValue('stock_toohigh_happy') + this.getDataValue('stock_toolow_happy') + this.getDataValue('stock_general_happy') + this.getDataValue('stock_toohigh_sad') + this.getDataValue('stock_toolow_sad') + this.getDataValue('stock_general_sad');
            }, stock_happy: function () {
                return this.getDataValue('stock_toohigh_happy') + this.getDataValue('stock_toolow_happy') + this.getDataValue('stock_general_happy');
            }, stock_sad: function () {
                return this.getDataValue('stock_toohigh_sad') + this.getDataValue('stock_toolow_sad') + this.getDataValue('stock_general_sad');
            }, id: function () {
                return this.getDataValue('cid');
            }
        }
    });
};
