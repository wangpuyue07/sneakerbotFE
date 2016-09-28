var utils = require('../../lib/application/genUtils');
var storeService = require('../../lib/spots/storeService');
var staffService = require('../../lib/spots/staffService');
var organisationService = require('../../lib/spots/organisationService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');
var stubs = require('./../stubs');

describe('storeService', () => {

    afterEach(function (done) {
        Promise.all([
                sql.models.spots.destroy({ truncate : true }),
                sql.models.organisations.destroy({ truncate : true })
        ])
        .then(() => {
            done();
        });
    });

    var organisationId = 'ae1ad665-6371-44aa-ad55-017961330b8b';
    var storeStub = { names : [{ text : 'Newmarket' }], email : 'newmarket@seekstock.co.nz', organisationId : organisationId, _userContext : stubs.userContext };

    it('Should Create, update, list and delete a store', function (done) {
        var id = null;
        storeService.createStore(storeStub).then(res => {
            assert(res.id);
            id = res.id;
            return storeService.updateStore({ id: id, names : [{ text : 'Wellington' }], _userContext : stubs.userContext});
        }).then(res => {
            assert.equal(res.previous.names[0].text, 'Newmarket');
            assert.equal(res.current.names[0].text, 'Wellington');
            return storeService.getStore({ id : id , _userContext : stubs.userContext});
        }).then(res => {
            assert(res.id);
            return storeService.listStores({ organisationId : organisationId, _userContext : stubs.userContext});
        }).then(res => {
            assert(Array.isArray(res));
            assert.equal(res.length, 1);
            return storeService.deleteStore({ id : id, _userContext : stubs.userContext });
        }).then(function(){
            done();
        }).catch(function (e) {
            done(e)
        });
    });

    it('Should Get full store context', function (done) {
        var id = null, staffId = null;
        organisationService.createOrganisation({
            domain: 'gap.com',
            leadUserEmail : 'dill@gap.com',
            _userContext : stubs.userContext,
            productUrlPrefix : 'http://myimagehost/',
            productSearchIndex : 'mysearch'
        }).then(res => {
            storeStub.organisationId = res.id;
            return storeService.createStore(storeStub);
        }).then(res => {
            assert(res.id);
            id = res.id;
            return staffService.createStaff({ names: [{ text : 'Richard'}], storeId : id, organisationId : storeStub.organisationId, _userContext : stubs.userContext });
        }).then(res => {
            staffId = res.id;
            return storeService.getStoreContext({ id : id , _userContext : stubs.userContext});
        }).then(res => {
            assert.equal(res.id, id);
            assert.equal(res.organisation.id, storeStub.organisationId);
            assert.equal(res.staff[0].id, staffId);
            assert(res.id);
            done();
        }).catch(function (e) {
            done(e)
        });
    });
});


