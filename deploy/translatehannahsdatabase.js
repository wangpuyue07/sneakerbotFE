/**
 * Created by Anthony on 2018/6/5.
 */
var fs = require('fs');
var moment = require('moment');
var _ = require('lodash');
var cassandra = require('cassandra-driver');
var translateFace=(face)=>{
    if(face=='happy')return 'positive';
    return 'negative';
};
///////////////////////////////////////////////////////////////////////////////////////////
var collections = JSON.parse(fs.readFileSync("./demo/collections.json", "utf-8"));
var collectionsResult = {"RECORDS": []};
collections['RECORDS'].forEach(item => {
    collectionsResult['RECORDS'].push({
        id: item.cid,
        creatorId: item.staffId,
        activityId: item.activityId,
        active: item.active,
        deleted: item.deleted,
        type: item.type,
        storeId: item.storeId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
    })
});
fs.writeFile("./new/collections.json", JSON.stringify(collectionsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var comments = JSON.parse(fs.readFileSync("./demo/comments.json", "utf-8"));
var commentsResult = {"RECORDS": []};
comments['RECORDS'].forEach(item => {
    commentsResult['RECORDS'].push({
        id: item.cid,
        content: item.content,
        creatorId: item.staffId,
        activityId: item.activityId,
        deleted: item.deleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        mentionId: item.mentionId,
        type: item.topic,
        storeId: item.storeId,
        img: item.img
    })
});
fs.writeFile("./new/comments.json", JSON.stringify(commentsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var exemptions = JSON.parse(fs.readFileSync("./demo/exemptions.json", "utf-8"));
var exemptionsResult = {"RECORDS": []};
exemptions['RECORDS'].forEach(item => {
    exemptionsResult['RECORDS'].push({
        id: item.cid,
        activityId: item.activityId,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
        deleted: item.deleted,
        creatorId: item.staffId,
        storeId: item.storeId,
        active: item.active
    })
});
fs.writeFile("./new/exemptions.json", JSON.stringify(exemptionsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var groups = JSON.parse(fs.readFileSync("./demo/groups.json", "utf-8"));
var groupsResult = {"RECORDS": []};
groups['RECORDS'].forEach(item => {
    groupsResult['RECORDS'].push({
        id: item.cid,
        names: item.names,
        deleted: item.deleted,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        creatorId: item.creatorId,
        active: item.active,
        organizationId: item.organisationId,
        storeIds: item.storeIds
    })
});
fs.writeFile("./new/groups.json", JSON.stringify(groupsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var notifications = JSON.parse(fs.readFileSync("./demo/notifications.json", "utf-8"));
var notificationsResult = {"RECORDS": []};
notifications['RECORDS'].forEach(item => {
    item.id = item.cid;
    delete item.cid;
    notificationsResult['RECORDS'].push(item)
});
fs.writeFile("./new/notifications.json", JSON.stringify(notificationsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var organisations = JSON.parse(fs.readFileSync("./demo/organisations.json", "utf-8"));
var organisationsResult = {"RECORDS": []};
organisations['RECORDS'].forEach(item => {
    item.id = item.cid;
    delete item.cid;
    organisationsResult['RECORDS'].push(item)
});
fs.writeFile("./new/organizations.json", JSON.stringify(organisationsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var requests = JSON.parse(fs.readFileSync("./demo/requestFeedbacks.json", "utf-8"));
var requestsResult = {"RECORDS": []};
requests['RECORDS'].forEach(item => {
    var timeout;
    if(item.timeout){
        timeout=item.timeout;
    }else{
        timeout=moment(new Date(item.createdAt)).add(3,'days');
        timeout=timeout.format('MM/DD/YYYY hh:mm:ss');
    }
    requestsResult['RECORDS'].push({
        id: item.cid,
        creatorId: item.staffId,
        storeId: item.storeId,
        productId:item.sku,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deleted: item.deleted,
        description:item.description,
        organizationId:item.organisationId,
        timeout:timeout,
        groups:item.groups
    })
});
fs.writeFile("./new/requests.json", JSON.stringify(requestsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var staffs = JSON.parse(fs.readFileSync("./demo/staffs.json", "utf-8"));
var staffCounts = JSON.parse(fs.readFileSync("./demo/a_staffActivityCounts.json", "utf-8"));
var staffsResult = {"RECORDS": []};
var staffHash={};
staffCounts['RECORDS'].forEach(sc=>{
    staffHash[sc.staffId]=sc;
});
staffs['RECORDS'].forEach(item => {
    staffsResult['RECORDS'].push({
        id: item.cid,
        names:JSON.parse(item.names)[0].text,
        email:item.email,
        userId:item.userId,
        barCode:item.barCode,
        permission_level:item.permission_level,
        role:item.role,
        role_ab:item.role_ab,
        storeId: item.storeId,
        deleted: item.deleted,
        creatorId: item.creatorId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        active:item.active,
        staffCode:item.staffCode,
        organizationId:item.organisationId,
        type:item.type,
        emailStatus:item.emailStatus,
        preRank:staffHash[item.cid]?staffHash[item.cid].preRank:0,
        curRank:staffHash[item.cid]?staffHash[item.cid].curRank:0,
        portrait:''
    })
});
fs.writeFile("./new/staffs.json", JSON.stringify(staffsResult), () => {});
///////////////////////////////////////////////////////////////////////////////////////////
var stores = JSON.parse(fs.readFileSync("./demo/stores.json", "utf-8"));
var storesResult = {"RECORDS": []};
stores['RECORDS'].forEach(item => {
    if(!item.email){
        storesResult['RECORDS'].push({
            id: item.cid,
            names:JSON.parse(item.names)[0].text,
            email:'N/A',//should be null for HQ
            deleted: item.deleted,
            city:'Head Office',
            location:'Head Office',
            country:'N/A',
            province:'N/A',
            phone:'N/A',
            postCode:'N/A',
            updatedAt: item.createdAt,
            createdAt: item.updatedAt,
            creatorId:'N/A',
            shortCode:JSON.parse(item.shortCode).text,
            active:item.active,
            barCode:'N/A',
            organizationId:item.organisationId,
            emailStatus:item.emailStatus,
            storeCode:'N/A',
            preRank:0,
            curRank:0,
            suburb:'N/A'
        })
    }else{
        storesResult['RECORDS'].push({
            id: item.cid,
            names:JSON.parse(item.names)[0].text,
            email:item.email,
            deleted: item.deleted,
            city:item.city,
            location:item.location.split('/n')[0],
            country:item.country,
            province:item.province,
            phone:item.phone,
            postCode:item.postCode,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            creatorId:item.creatorId,
            shortCode:JSON.parse(item.shortCode).text,
            active:item.active,
            barCode:item.barCode,
            organizationId:item.organisationId,
            emailStatus:item.emailStatus,
            storeCode:item.storeCode,
            preRank:0,
            curRank:0,
            suburb:item.location.split('/n')[1]
        })
    }

});
fs.writeFile("./new/stores.json", JSON.stringify(storesResult), () => {});
///////////////////////////////////////////////////////////////////////////////////////////
var principals = JSON.parse(fs.readFileSync("./demo/newPrincipals.json", "utf-8"));
var principalsResult = {"RECORDS": []};
principals['RECORDS'].forEach(item => {
    var spotId;
    if(item.type=='manager'){
        staffs['RECORDS'].forEach(staff=>{
            if(staff.email==item.username){
                spotId=staff.cid;
            }
        })
    }else{
        stores['RECORDS'].forEach(store=>{
            if(store.email==item.username){
                spotId=store.cid;
            }
        })
    }
    principalsResult['RECORDS'].push({
        id: item.cid,
        username: item.username,
        passwordHash: item.passwordHash,
        creatorId: item.creatorId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        active: item.active,
        deleted: item.deleted,
        type: item.type,
        organizationId: item.organisationId,
        spotId:spotId
    })
});
fs.writeFile("./new/principals.json", JSON.stringify(principalsResult), () => {
});
///////////////////////////////////////////////////////////////////////////////////////////
var thanks = JSON.parse(fs.readFileSync("./demo/thanks.json", "utf-8"));
var thanksResult = {"RECORDS": []};
thanks['RECORDS'].forEach(item => {
    item.id=item.cid;
    delete item.cid;
    item.creatorId=item.staffId;
    delete item.staffId;
    thanksResult['RECORDS'].push(item)
});
fs.writeFile("./new/thanks.json", JSON.stringify(thanksResult), () => {});
///////////////////////////////////////////////////////////////////////////////////////////
var votes = JSON.parse(fs.readFileSync("./demo/votes.json", "utf-8"));
var votesResult = {"RECORDS": []};
votes['RECORDS'].forEach(item => {
    item.id=item.cid;
    delete item.cid;
    item.creatorId=item.staffId;
    delete item.staffId;
    votesResult['RECORDS'].push(item)
});
fs.writeFile("./new/votes.json", JSON.stringify(votesResult), () => {});
///////////////////////////////////////////////////////////////////////////////////////////
var fits = JSON.parse(fs.readFileSync("./demo/feedback_fits.json", "utf-8"));
var prices = JSON.parse(fs.readFileSync("./demo/feedback_prices.json", "utf-8"));
var qualitys = JSON.parse(fs.readFileSync("./demo/feedback_qualitys.json", "utf-8"));
var stocks = JSON.parse(fs.readFileSync("./demo/feedback_stocks.json", "utf-8"));
var styles = JSON.parse(fs.readFileSync("./demo/feedback_styles.json", "utf-8"));
var suggestions = JSON.parse(fs.readFileSync("./demo/newsuggestions.json", "utf-8"));
var products = JSON.parse(fs.readFileSync("./demo/newproducts.json", "utf-8"));
var productHash={};
var activitiesResult = {"RECORDS": []};
products['RECORDS'].forEach(p=>{
    productHash[p.sku]=p;
});
fits['RECORDS'].forEach(item => {
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.productId,
        attitude:translateFace(item.face),
        img:item.img,
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'feedback',
        category:'fit',
        subCategory:item.topic.split('|')[1],
        comment:item.description,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:'|'+item.where.split(',').join('|')+'|',
        productCategory:productHash[item.productId].category,
        productBrand:productHash[item.productId].brand,
        productSeason:productHash[item.productId].season
    })
});
prices['RECORDS'].forEach(item => {
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.productId,
        attitude:translateFace(item.face),
        img:item.img,
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'feedback',
        category:'price',
        subCategory:item.topic.split('|')[1],
        comment:item.description,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:'|'+item.where.split(',').join('|')+'|',
        productCategory:productHash[item.productId].category,
        productBrand:productHash[item.productId].brand,
        productSeason:productHash[item.productId].season
    })
});
qualitys['RECORDS'].forEach(item => {
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.productId,
        attitude:translateFace(item.face),
        img:item.img,
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'feedback',
        category:'quality',
        subCategory:item.topic.split('|')[1],
        comment:item.description,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:'|'+_.compact([item.what,...item.when.split(','),...item.where.split(','),...item.tag.split(',')]).join('|')+'|',
        productCategory:productHash[item.productId].category,
        productBrand:productHash[item.productId].brand,
        productSeason:productHash[item.productId].season
    })
});
stocks['RECORDS'].forEach(item => {
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.productId,
        attitude:translateFace(item.face),
        img:item.img,
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'feedback',
        category:'stock',
        subCategory:item.topic.split('|')[1],
        comment:item.description+item.stockHighTUM+item.stockLowTUM,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:'|'+_.compact([...item.tag.split(','),...item.understocked.split(','),...item.overstocked.split(','),...item.arrivedTime.split(','),...item.requestSize.split(',')]).join('|')+'|',
        productCategory:productHash[item.productId].category,
        productBrand:productHash[item.productId].brand,
        productSeason:productHash[item.productId].season
    })
});
styles['RECORDS'].forEach(item => {
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.productId,
        attitude:translateFace(item.face),
        img:'',
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'feedback',
        category:'style',
        subCategory:item.topic.split('|')[1],
        comment:item.what,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:'|'+_.compact(item.tag.split(','))+'|',
        productCategory:productHash[item.productId].category,
        productBrand:productHash[item.productId].brand,
        productSeason:productHash[item.productId].season
    })
    if(item.description!=''){
        activitiesResult['RECORDS'].push({
            id:cassandra.types.timeuuid(),
            productId:item.productId,
            attitude:'neutral',
            img:'',
            storeId:item.storeId,
            deleted:item.deleted,
            creatorId:item.staffId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            type:'feedback',
            category:'suggestion',
            subCategory:'Style Suggestion',
            comment:item.description,
            appliesTo:item.appliesTo,
            organizationId:item.organisationId,
            tags:'|'+_.compact(item.tag.split(','))+'|',
            productCategory:productHash[item.productId].category,
            productBrand:productHash[item.productId].brand,
            productSeason:productHash[item.productId].season
        })
    }
});
suggestions['RECORDS'].forEach(item=>{
    activitiesResult['RECORDS'].push({
        id:item.cid,
        productId:item.cid,
        attitude:'neutral',
        img:item.images,
        storeId:item.storeId,
        deleted:item.deleted,
        creatorId:item.staffId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        type:'newSuggestion',
        category:item.product_type,
        subCategory:_.compact(item.style_cut.split('|')).join(','),
        comment:item.description,
        appliesTo:item.appliesTo,
        organizationId:item.organisationId,
        tags:item.color,
        productCategory:'',
        productBrand:'',
        productSeason:''
    })
});
fs.writeFile("./new/activities.json", JSON.stringify(activitiesResult), () => {});
