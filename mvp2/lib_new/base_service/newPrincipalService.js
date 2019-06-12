var constants = require('../application/constants');
var Persistence = require('../../lib_new/application/persistence');
//var spotService = require('../../lib/spots/spotService');
var persistence = new Persistence(constants.entityTypes.newPrincipals);
// var passwordResets = new Persistence(constants.entityTypes.passwordReset);
var genUtils = require('../application/genUtils');
var bcrypt = require('bcryptjs');
var service = require('../application/serviceUtils');
//TODO: the path of object should be changed in final .
var objects = require('../../lib_new/objects');
require('js-throttle-debounce');


/**
 * @param username
 * @param password
 * @param requestContext
 * @returns {*}
 */
exports.createPrincipal = function (command) {
    var id;
    return exports.getAPrincipal(command.username).then((res) => {
        if (res === null) {
            return encryptPassword(command.password).then(function (hash) {
                id = service.createTimeUuid();
                command.cid = id;
                command.passwordHash = hash;
                command.active = 1;
                command.creatorId = command._userContext.staffId;
                return persistence.createItem(command);
            });
        } else {
            return {errorMsg: 'item has already exist'};
        }
    });

};
exports.updatePrincipal = function (command) {

    return exports.getAPrincipal(command.email).then(res=>{
        command.id = res.id;
        if (command.password.length > 30) {
            return persistence.updateItem(command);
        } else {
            return encryptPassword(command.password).then(function (hash) {
                command.passwordHash  = hash;
                return persistence.updateItem(command);
            });
        }
    });


};
exports.authenticate = authenticate = function (username, password) {
    var principal;
    return persistence.getItem({username: username}).then(function (res) {
        if(res && res.active == 0){
            return {authenticated:false, err:'username'};
        }
        principal = res;
        if(res === null || principal.username != username) return {authenticated:false, err:'username'};
        return bcrypt.compareAsync(password, res.passwordHash);
    }).then(function (isAuthenticated) {
        if (isAuthenticated == true) return {cid: principal.cid, authenticated: true, role:principal.type};
        if (!isAuthenticated.err) return {authenticated: false, err: 'password'};
        return isAuthenticated;
    });
};

exports.getAPrincipal = function (username) {
    return persistence.getItem({username: username}).then(function (res) {
        if (!res) return null;
        return res;
    })
};
exports.getAPrincipalById = function (id) {
    return persistence.getItem({cid: id}).then(function (res) {
        if (!res) return null;
        return res;
    })
};

exports.getPrincipal = function (command) {
    return persistence.getItem(command).then(function (res) {
        if (!res)  return [];
        var responseObject = objects[res.type + '_L'];
        if(!responseObject) throw new Error('Category:' + res.type + ' does not have a response object.');
        return command._raw  ? res : responseObject({ obj : res });
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
        return passwordResets.createItem({
            code: token,
            principalId: principal.id,
            expires: resetExpiry,
            _userContext: requestContext
        });
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
            return {id: id, valid: true, principalId: res.id, displayName: res.names[0].text}
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
            persistence.updateItem({id: principal.id, passwordHash: passwordHash}),
            passwordResets.updateItem({id: reset.id, used: true})
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
/**
 * do de-active action
 * @param command
 * @returns {*|Promise.<TResult>}
 */
exports.deletePrincipal = function (command) {
     return persistence.deleteItem({username: command.email});
};
exports.deactivePrincipal = function (command) {
    return persistence.getItem({username: command.email}).then(function (res) {
        res.active = 0;
        return persistence.updateItem(res);
    });
};
exports.activePrincipal = function (command) {
    return persistence.getItem({username: command.email}).then(function (res) {
        res.active = 1;
        return persistence.updateItem(res);
    });
};

exports.doActive = function (command) {
    if(!command){
        return {};
    }
    // console.log(command);
    //
    // console.log(constants.activeFunc);
    // console.log(constants.activeStore);
    var role = command._userContext.role;
    var myId = command._userContext.email;
    if(role == "store" && myId) {
        constants.activeStore[myId] = 1;
        if(!constants.activeFunc[myId]){
            constants.activeFunc[myId] = function () {
                constants.activeStore[myId] = 0;
                // console.log(1111);
                // console.log(constants.activeFunc);
                // console.log(constants.activeStore);
            }.debounce(21000);
        }
        constants.activeFunc[myId]();
    }
    return {};
};



