var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var notificationService = require('../../lib/notificationService');
var newsService = require('../../lib/newsService');

route.get('/:recipientId', service.handleWith(notificationService.listNotifications));

route.put('/mark-as-read', service.handleWith(notificationService.markAsRead));

module.exports = route;