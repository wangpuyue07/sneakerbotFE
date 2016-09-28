var organisationService = require('../lib/spots/organisationService');
var staffService = require('../lib/spots/staffService');
var storeService = require('../lib/spots/storeService');
var constants = require('./constants');

/* command = { obj : , id : , context : }; */
function getObject(command, entityType) {
    if (!command.obj && !command.id) return null;
    return command.obj || lookup.cache.get(entityType, command.id);
}

exports.person_L = function (command) {
    var thing = command;
    return {
        id: thing.id,
        category: thing.category,
        isGeneric: thing.isGeneric,
        isMainGeneric: thing.isMainGeneric,
        types: thing.types,
        cultures: thing.cultures,
        origins: thing.origins,
        names: thing.names,
        role: 'user',

        branchName: thing.branchName,
        externalId: thing.externalId,
        location: thing.location,
        phoneNumber: thing.phoneNumber,
        rawAddress: thing.rawAddress,
        twitterHandle: thing.twitterHandle,
        webAddress: thing.webAddress,

        imageId: thing.imageId,
        creatorId: thing.creatorId,
        created: thing.created,
        updated: thing.updated
    }
};

exports.person_XS = function (command) {
    command = command || {};
    if (!command) return null;
    return {
        id: command.id,
        displayName: command.names ? command.names[0].text : null,
        image: command.image || command.imageId
    }
};

exports.store_L = function (command) {
    return new Promise((resolve, reject) => {
        var store = getObject(command);
        if (!store)  resolve(null);
        Promise.all([
            organisationService.getOrganisation({id: store.organisationId }, { userContextRequired: false }),
            staffService.listStaff({organisationId: store.organisationId }, { userContextRequired: false }),
            storeService.listStores({ organisationId : store.organisationId })
        ]).then(res => {
            resolve({
                id: store.id,
                names: store.names,
                email: store.email,
                organisation: res[0],
                staff: res[1],
                stores: res[2],
                role: 'store',
                updatedAt: store.updatedAt,
                createdAt: store.createdAt
            })
        })
    })
};


exports.store_S = function (command) {
    var store = getObject(command);
    if (!store) return null;
    return {
        id: store.id,
        names: store.names,
        email: store.email,
        organisationId: store.organisationId,
        role: 'store',
        updatedAt: store.updatedAt,
        createdAt: store.createdAt
    }
};

exports.message_S = function (command) {
    if (!command) return null;
    return {
        text: command.comment,
        cid: command.cid,
        status: command.status,
        createdAt: command.createdAt
    }
};

exports.comment_S = function (command) {
    if (!command) return null;
    return {
        id: command.id,
        text: command.text,
        createdAt: command.createdAt,
        person_S: command.person_S,
        replies: [],
        likes: [],
        cid: ''
    }
};
