var constants = require('./../constants');
var Persistence = require('../application/persistence');
var spotService = require('../spots/spotService');
var persistence = new Persistence(constants.entityTypes.principal);
var passwordResets = new Persistence(constants.entityTypes.passwordReset);
var genUtils = require('../application/genUtils');
var bcrypt = require('bcryptjs');
var service = require('../application/serviceUtils');

/**
 * @param username
 * @param password
 * @param requestContext
 * @returns {*}
 */
exports.createPrincipal = function (username, password, requestContext) {
    if (!username || !password) throw new RangeError('username or password are required.');
    var id;
    return encryptPassword(password).then(function (hash) {
        id = service.createTimeUuid();
        return persistence.createItem({
            id: id,
            username: username,
            passwordHash: hash,
            _userContext: requestContext
        });
    });
};

exports.authenticate = authenticate = function (username, password) {
    var principal;
    return persistence.getItem({username: username}).then(function (res) {
        principal = res;
        if (!principal) return {authenticated: false};
        return bcrypt.compareAsync(password, principal.passwordHash);
    }).then(function (isAuthenticated) {
        if(isAuthenticated) return { id : principal.id, authenticated : true };
        return { authenticated : false }
    });
};

exports.getPrincipal = function (username) {
    return persistence.getItem({username: username}).then(function (res) {
        if (!res) return null;
        return {id: res.id, username: res.username, googleId: res.googleId, createdAt: res.createdAt};
    })
};

exports.changePassword = function (username, oldPassword, newPassword) {
    var authentication;
    return authenticate(username, oldPassword).then(function (res) {
        authentication = res;
        if (!authentication) throw new Error('invalid username or password.');
        return encryptPassword(newPassword);
    }).then(function (hash) {
        return persistence.updateItem({id: authentication.id, passwordHash: hash});
    }).then(function () {
        //Ensure we don't return item as it contains password hash.
        return null;
    })
};

exports.createPasswordResetCode = function (username, expiryDays, requestContext) {
    var resetExpiry = new Date(Date.now() + (expiryDays * 86400000));
    var principal;
    return exports.getPrincipal(username).then(function (res) {
        if (!res) throw new service.ValidationError('There is no user with that email address.');
        principal = res;
        return genUtils.createToken(8);
    }).then(function (token) {
        //HIT: Should we expire previous reset codes?
        return passwordResets.createItem({code: token, principalId: principal.id, expires: resetExpiry, _userContext: requestContext});
    }).then(function (res) {
        return res.code;
    });
};

exports.checkPasswordResetCode = checkPasswordResetCode = function (code) {
    var id;
    return passwordResets.getItem({code: code}).then(function (res) {
        if (!res) return {valid: false, message: 'non-existant'};
        id = res.id;
        if (res.used) return {valid: false, message: 'used'};
        if (Date.now() > res.expires.getTime()) return {valid: false, message: 'expired'};
        return spotService.getSpot({id: res.principalId, _raw: true}).then(function (res) {
            return { id : id, valid: true, principalId: res.id, displayName: res.names[0].text}
        });
    });
};

exports.changePasswordWithCode = function (username, code, password) {
    var principal, reset;
    return checkPasswordResetCode(code).then(function (res) {
        reset = res;
        if (!res.valid) throw new service.ValidationError('That password reset code is invalid or expired.');
        return persistence.getItem({id: res.principalId});
    }).then(function (res) {
        principal = res;
        if (res.username !== username) throw new service.ValidationError('You have attempted to use the reset code for the incorrect account.');
        return encryptPassword(password);
    }).then(function (passwordHash) {
        return Promise.all([
            persistence.updateItem({ id : principal.id, passwordHash : passwordHash }),
            passwordResets.updateItem({ id : reset.id, used : true })
        ]);
    }).then(function () {
        return null;
    });
};

exports.checkExists = function (username) {
    return persistence.getItem({username: username}).then(function (res) {
        return !!res;
    });
};

var encryptPassword = function (password) {
    return bcrypt.genSaltAsync(process.env.NODE_ENV == 'production' ? 10 : 5).then(function (salt) {
        return bcrypt.hashAsync(password, salt);
    }).then(function (hash) {
        return hash;
    });
};

exports.deletePrincipal = function(id){
    return persistence.deleteItem({ id : id });
};
