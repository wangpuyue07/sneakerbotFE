var passport = require('passport');
var config = require('../../config');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var authenticationCommon = require('./authentication.common');
var genUtils = require('../../lib/application/genUtils');
var organisationService = require('../../lib/spots/organisationService');
var service = require('../../lib/application/serviceUtils');

exports.strategy = function(req, res){
    passport.authenticate('google-authentication', {
        scope: ['email'],
        failureRedirect: '/signup',
        prompt: 'select_account',
        session: false
    })(req, res);
};

passport.use('google-authentication', new GoogleStrategy({
        clientID: config.google.appId,
        clientSecret: config.google.appSecret,
        callbackURL: authenticationCommon.getCallBackUrl('google')
    },
    function(accessToken, refreshToken, externalUser, done) {
        if(config.featureToggles['feature_sigin_oauth'] !== 'true'){
            throw new service.SignInError('OAuth sign-in is not permitted.');
        }

        var emailStruct = genUtils.getEmailStruct(externalUser.email);

        var allowedDomains = ['seekstock.co.nz', 'iloveugly.net'];
        if(allowedDomains.indexOf(emailStruct.domain) < 0)
            throw new service.SignInError('"' + emailStruct.domain + '"' + ' is not a registered domain on Seekstock.');

        var allowedAddresses = ['newmarket', 'wellington', 'losangeles', 'melbourne', 'seekstock'];
        if(allowedAddresses.indexOf(emailStruct.address) < 0 )
            throw new service.SignInError(externalUser.email + ' is not a registered ' + emailStruct.domain + ' account.');

        externalUser.displayName = externalUser.email;
        var user;
        return organisationService.getOrganisation({domain: emailStruct.domain}, { userContextRequired : false }).then(org => {
            if (org) return org;
            return organisationService.createOrganisation({domain: emailStruct.domain, leadUserEmail: externalUser.email}, { userContextRequired: false });
        }).then(org => {
            return authenticationCommon.upsertStore(externalUser, org.id);
        }).then(user => {
            done(null, user);
        });
}));
