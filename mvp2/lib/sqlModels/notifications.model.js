var Sequelize = require('sequelize');
var constants = require('../constants');

module.exports = function (db, models) {
    models.notifications = db.define('notifications', {
        id: { type: Sequelize.UUID, primaryKey: true },
        recipientId: { type: Sequelize.STRING, allowNull: false },
        activityId: { type: Sequelize.UUID, allowNull: false },
        notificationType: { type: Sequelize.STRING, allowNull: false },
        read: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: '0' }
    },{
        entityName: constants.entityTypes.notification
    });
};