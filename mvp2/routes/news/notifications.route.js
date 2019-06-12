var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var notificationService = require('../../lib_new/base_service/notificationService');

route.get('/:recipientId', service.handleWith(notificationService.listNotifications));

route.put('/mark-as-read', service.handleWith(notificationService.markAsRead));

module.exports = route;