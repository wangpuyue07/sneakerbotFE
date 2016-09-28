var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../constants');

module.exports = function (db, models) {
    models.spots = db.define('spots', {
        id: { type: Sequelize.UUID, primaryKey: true },
        names: {type: Sequelize.STRING(300), allowNull: false},
        email: {type: Sequelize.STRING(300)},
        apiKey: {type: Sequelize.STRING(300)},
        typeIds: {type: Sequelize.STRING(300), allowNull: true},
        category: {type: Sequelize.STRING(16), allowNull: false},
        imageId: {type: Sequelize.STRING(64), allowNull: true},
        cultureIds: {type: Sequelize.STRING(300), allowNull: true},
        originIds: {type: Sequelize.STRING(300), allowNull: true},
        isGeneric: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false},
        isMainGeneric: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false},
        externalId: {type: Sequelize.STRING(64), allowNull: true},
        generics: {type: Sequelize.STRING(300), allowNull: true},
        exclusiveToSpotIds: {type: Sequelize.STRING(300), allowNull: true},
        googleId: {type: Sequelize.STRING(64), allowNull: true},
        organisationId: {type: Sequelize.STRING(64), allowNull: true},
        storeId: {type: Sequelize.STRING(64), allowNull: true},
        location_id: {type: Sequelize.STRING(20), allowNull: true},
        location_lat: {type: Sequelize.FLOAT(8,5), allowNull: true},
        location_lng: {type: Sequelize.FLOAT(8,5), allowNull: true},
        location_name: {type: Sequelize.STRING(100), allowNull: true},
        location_longName: {type: Sequelize.STRING(300), allowNull: true},
        status: {type: Sequelize.STRING, allowNull: true},
        slug: {type: Sequelize.STRING, allowNull : false, defaultValue: '' }
    }, {
        entityName: constants.entityTypes.spot,
        getterMethods: {
            names: function () {
                if(!this.getDataValue('names')) return {};
                return JSON.parse(this.getDataValue('names'));
            },
            typeIds: function () {
                return genUtils.PNAN.parse(this.getDataValue('typeIds'));
            },
            cultureIds: function () {
                return genUtils.PNAN.parse(this.getDataValue('cultureIds'));
            },
            originIds: function () {
                return genUtils.PNAN.parse(this.getDataValue('originIds'));
            },
            genericIds: function () {
                return genUtils.PNAN.parse(this.getDataValue('genericIds'));
            },
            exclusiveToSpotIds: function () {
                return genUtils.PNAN.parse(this.getDataValue('exclusiveToSpotIds'));
            },
            location: function(){
                if(this.getDataValue('category') !== constants.spotCategories.place) return;
                var location = { point : {}};
                location.id = this.getDataValue('location_id');
                location.point.lat = this.getDataValue('location_lat');
                location.point.lng = this.getDataValue('location_lng');
                location.name = this.getDataValue('location_name');
                location.longName = this.getDataValue('location_longName');
                return location;
            }
        },
        setterMethods: {
            names: function (val) {
                this.setDataValue('names', JSON.stringify(val));
            },
            typeIds: function (val) {
                this.setDataValue('typeIds', genUtils.PNAN.stringify(val));
            },
            cultureIds: function (val) {
                this.setDataValue('cultureIds', genUtils.PNAN.stringify(val));
            },
            originIds: function (val) {
                this.setDataValue('originIds', genUtils.PNAN.stringify(val));
            },
            genericIds: function (val) {
                this.setDataValue('genericIds', genUtils.PNAN.stringify(val));
            },
            exclusiveToSpotIds: function (val) {
                this.setDataValue('exclusiveToSpotIds', genUtils.PNAN.stringify(val));
            },
            location: function(val){
                if(!val) return;
                this.setDataValue('location_id', val.id);
                this.setDataValue('location_lat', val.point.lat);
                this.setDataValue('location_lng', val.point.lng);
                this.setDataValue('location_name', val.name);
                this.setDataValue('location_longName', val.longName);
            }
        }
    }, {
        entityName: constants.entityTypes.spot
    });
};