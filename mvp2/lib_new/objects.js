//var organisationService = require('../lib/spots/organisationService');
//var staffService = require('../lib/spots/staffService');
var newStaffService = require('../lib_new/base_service/staffService');
//var staffService = require('../lib_new/base_service/staffService');
var newOrganisationService = require('../lib_new/base_service/organisationService');
var newStoreService = require('../lib_new/base_service/storeService');
//var storeService = require('../lib/spots/storeService');
//var constants = require('./constants');
var _ = require('lodash');
/* command = { obj : , id : , context : }; */
// function getObject(command, entityType) {
//     if (!command.obj && !command.id) return null;
//     return command.obj || lookup.cache.get(entityType, command.id);
// }
function getObject(command, entityType) {
    if (!command.obj && !command.cid) return null;
    return command.obj || lookup.cache.get(entityType, command.cid);
}
// exports.staff_L = function (command) {
//     console.log("object_staff_L");
//     return new Promise((resolve, reject) => {
//         var store = getObject(command);
//         console.log("object_staff_L: 为啥要用store,明明是登录者的信息");
//         console.log(store);
//         console.log("object_staff_L: 为啥要用store,明明是登录者的信息");
//         if (!store)  resolve(null);
//         Promise.all([
//             //organisationService.getOrganisation({id: store.organisationId }, { userContextRequired: false }),
//            // staffService.listStaff({deleted: 0 },{active: 1}),
//
//             // staffService.listStaff({ organisationId : store.organisationId }),
//             // storeService.listStores({ organisationId : store.organisationId })
//             newStaffService.listStaff({}),
//             newStoreService.listStores({})
//         ]).then(res => {
//             resolve({
//                // cid:store.cid,
//                 id: store.id, // it is creator Id not store.id
//                 names: store.names, // it is creator name not store.names
//                 email: store.email, // it is creator email not store's
//                 organisation: res[0],
//                 staff: res[1],
//                 stores: res[2],
//                 // staff: res[0],
//                 // stores: res[1],
//                 role: 'staff',
//                 updatedAt: store.updatedAt,
//                 createdAt: store.createdAt
//             })
//         })
//     })
// };


exports.person_XS = function (command) {
    command = command || {};
    if (!command) return null;
    return {
        id: command.id,
        displayName: command.names ? command.names[0].text : null,
        image: command.image || command.imageId
    }
};



// exports.store_S = function (command) {
//     var store = getObject(command);
//     if (!store) return null;
//     return {
//         id: store.id,
//         names: store.names,
//         email: store.email,
//         organisationId: store.organisationId,
//         role: 'store',
//         exclusiveToSpotIds:store.exclusiveToSpotIds,
//         barCode:store.barCode,
//         expansion:store.expansion,
//         updatedAt: store.updatedAt,
//         createdAt: store.createdAt
//     }
// };

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

exports.manager_L = function (command) {
    return new Promise((resolve, reject) => {
        var currentUser = getObject(command);
        if (!currentUser)  resolve(null);
        Promise.all([
            newOrganisationService.getOrganisation({deleted:0}),
            newStaffService.getStaff({email:currentUser.username}),
            newStaffService.listStaff({}),
            newStoreService.listStores({})
        ]).then(res => {
            if(currentUser.cid)
                resolve({
                    id: currentUser.cid,
                    names:res[1].names,
                    barCode:currentUser.barCode,
                    email: currentUser.username,
                    staff: res[2],
                    stores: res[3],
                    organisation:res[0],
                    role: 'manager',
                    updatedAt: currentUser.updatedAt,
                    createdAt: currentUser.createdAt
                })
        }).catch(asd=>{console.log(asd)})
    })
};

exports.store_L = function (command) {
    return new Promise((resolve, reject) => {
        var currentUser = getObject(command);
        if (!currentUser)  resolve(null);
        Promise.all([
            newOrganisationService.getOrganisation({deleted:0}),
            newStoreService.getStore({email:currentUser.username}),
            newStaffService.listStaff({}),
            newStoreService.listStores({})
        ]).then(res => {
            if(currentUser.cid)
                resolve({
                    id: currentUser.cid,
                    names:res[1].names,
                    email: currentUser.username,
                    staff: res[2],
                    stores: res[3],
                    organisation:res[0],
                    role: 'store',
                    active: currentUser.active,
                    city:currentUser.city,
                    location: currentUser.location,
                    country: currentUser.country,
                    province: currentUser.province,
                    phoneNumber: currentUser.phoneNumber,
                    postCode: currentUser.postCode,
                    updatedAt: currentUser.updatedAt,
                    createdAt: currentUser.createdAt
                })
        }).catch(asd=>{console.log(asd)})
    })
};
exports.store_S = function (command) {
    var currentUser = getObject(command);
    if (!currentUser) return null;
    return {
        id: currentUser.cid,
        names: currentUser.names,
        email: currentUser.email,
        barCode: currentUser.barCode,
        role: 'store',
        active: currentUser.active,
        expansion: currentUser.expansion,
        updatedAt: currentUser.updatedAt,
        createdAt: currentUser.createdAt,
        deleted:currentUser.deleted
    }
};

