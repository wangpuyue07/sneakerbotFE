var Sequelize = require('sequelize');
var constants = require('../constants');

module.exports = function (db, models) {
    models.passwordResets = db.define('password_resets', {
        code: { type: Sequelize.STRING, allowNull: false },
        principalId: {type: Sequelize.UUID, allowNull: false },
        expires: {type: Sequelize.DATE, allowNull: false },
        used: {type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false }
    }, {
        entityName: constants.entityTypes.passwordReset
    });
};