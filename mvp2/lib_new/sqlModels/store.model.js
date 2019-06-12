
var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {

    models.stores = db.define('stores', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        names:{ type: Sequelize.STRING(300), allowNull:false},
        email:{ type: Sequelize.STRING(300)},
        apiKey: {type: Sequelize.STRING(300)},
        category: {type: Sequelize.STRING(16), allowNull: true},
        provinceId: {type: Sequelize.STRING(36), allowNull: true},
        googleId: {type: Sequelize.STRING(36), allowNull: true},
        country_id: {type: Sequelize.STRING(20), allowNull: true},
        location_lat: {type: Sequelize.FLOAT(8, 5), allowNull: true},
        location_lng: {type: Sequelize.FLOAT(8, 5), allowNull: true},
        location_name: {type: Sequelize.STRING(100), allowNull: true},
        location_longName: {type: Sequelize.STRING(300), allowNull: true},
        city: {type: Sequelize.STRING(64), allowNull: true},
        active:{type:Sequelize.INTEGER, allowNull:false, defaultValue:1},
        deleted:{type:Sequelize.INTEGER, allowNull:false, defaultValue:0},
        country: {type: Sequelize.STRING(64), allowNull: true},
        location: {type: Sequelize.STRING(512), allowNull: true},
        province: {type: Sequelize.STRING(64), allowNull: true},
        phone: {type: Sequelize.STRING(32), allowNull: true},
        postCode: {type: Sequelize.STRING(32), allowNull: true},
        shortCode: {type: Sequelize.STRING(128), allowNull: true},
        createdAt:{type:Sequelize.DATE, allowNull:true},
        updatedAt:{type:Sequelize.DATE, allowNull:true},
        creatorId:{type: Sequelize.STRING(36), allowNull: true},
        barCode: {type: Sequelize.STRING(100), allowNull: true}
    }, {
        entityName: constants.entityTypes.stores,
        getterMethods: {
            id: function(){
            return this.getDataValue('cid');
            },
            names: function () {
                if (!this.getDataValue('names')) return {};
                 var names =this.getDataValue('names');
                     names = JSON.parse(names);
                     names.push(JSON.parse(this.getDataValue('shortCode')));
                return names;
            },
            shortCode: function() {
                if (!this.getDataValue('shortCode')) return {};
                return JSON.parse(this.getDataValue('shortCode'));
            },
            expansion: function(){
                var expansion = {};
                expansion.city = this.getDataValue('city');
                expansion.location = this.getDataValue('location');
                expansion.country = this.getDataValue('country');
                expansion.province = this.getDataValue('province');
                expansion.phoneNumber = this.getDataValue('phone');
                expansion.postCode = this.getDataValue('postCode');
                return JSON.stringify(expansion);
            }

        },
        setterMethods: {
            names:function (val) {
                if(!val) return;
                var names = [];
                names.push(val[0]);
                this.setDataValue('shortCode', val[1] ? JSON.stringify(val[1]): null);
                this.setDataValue('names', val[0] ? JSON.stringify(names): null );
            },
            expansion: function(val){
                if(!val) return;
                var result = JSON.parse(val);
                this.setDataValue('city', result.city);
                this.setDataValue('location', result.location);
                this.setDataValue('country', result.country);
                this.setDataValue('province', result.province);
                this.setDataValue('phone', result.phoneNumber);
                this.setDataValue('postCode', result.postCode);
            }
            // ,
            // shortCode: function(val) {
            //     if(!val) return;
            //     this.setDataValue('shortCode', JSON.stringify(val));
            // }
        }
    });
};

