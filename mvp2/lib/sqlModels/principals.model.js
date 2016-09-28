var Sequelize = require('sequelize');
var constants = require('../constants');

module.exports = function (db, models) {
    models.principals = db.define('principals', {
        id: { type: Sequelize.UUID, primaryKey: true },
        username: {type: Sequelize.STRING, allowNull: false},
        passwordHash: {type: Sequelize.STRING, allowNull: false},
        googleId: {type: Sequelize.STRING, allowNull: true}
    }, {
        entityName: constants.entityTypes.principal
    });
};