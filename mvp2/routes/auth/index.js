'use strict';

var express = require('express');
var router = express.Router();
var handlers = require('./authentication.handlers');
var service = require('../../lib_new/application/serviceUtils');
var axios = require('axios');
var config = require('../../config');
var qs = require('qs');

router.post('/local', handlers.localHandler);
router.post('/vend', service.handleWith(function (command) {
    return axios.post('https://' + command.domain_prefix + '.vendhq.com/api/1.0/token', qs.stringify({
        code: command.code,
        client_id: config.vend.client_id,
        client_secret: config.vend.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: config.vend.redirect_uri
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(res => {
        return {auth:res.data}
    }).catch(err => {
        return {err:err.response.data.error_description}
    });
},{responseType:'full'}));
// router.get('/callback', handlers.oAuthCallbackMiddleware, handlers.oAuthCallbackHandler);
// router.get('/:name', handlers.oAuthAuthenticationHandler);

module.exports = router;



