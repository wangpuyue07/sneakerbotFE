'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('./authentication.handlers');

router.post('/local', handlers.localHandler);
router.get('/callback', handlers.oAuthCallbackMiddleware, handlers.oAuthCallbackHandler);
router.get('/:name', handlers.oAuthAuthenticationHandler);

module.exports = router;