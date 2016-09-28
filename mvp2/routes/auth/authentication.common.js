var storeService = require('../../lib/spots/storeService');
var genUtils = require('../../lib/application/genUtils');
var config = require('../../config');

exports.upsertStore = function (externalUser, organisationId) {
    var email = externalUser.emails[0].value;
    var store;
    return storeService.getStoreContext({email: email}).then(res => {
        store = res;
        if (store) return store;
        return storeService.getStoreContext({externalId: externalUser.id })
    }).then(res => {
        store = res;
        var command = createStoreValues(externalUser, organisationId);
        if (!store) {
            command.email = email;
            return storeService.createStore(command, { userContextRequired: false });
        }
        return store;
    });
};

exports.getCallBackUrl = function (destinationName) {
    return config.host + '/auth/callback?name=' + destinationName;
};

function createStoreValues(externalUser, organisationId) {
    var name = externalUser.displayName.split('@')[0];
    return {
        names: [{text: genUtils.toTitleCase(name) }],
        externalId: externalUser.id,
        googleId: externalUser.provider === 'google' ? externalUser.id : undefined,
        organisationId : organisationId
    }
}