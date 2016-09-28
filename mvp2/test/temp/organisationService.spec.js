var utils = require('../../lib/application/genUtils');
var organisationService = require('../../lib/spots/organisationService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');

describe('organisationService', () => {

    afterEach(function (done) {
        sql.models.organisations.destroy({ truncate : true }).then(() => {
            done();
        });
    });

    var organisationId = 'ae1ad665-6371-44aa-ad55-017961330b8b';
    var storeStub = { names : [{ text : 'Newmarket' }], email : 'newmarket@seekstock.co.nz', organisationId : organisationId, _userContext : { id : 'anonymous' }};

    it('Should get an organisation', function (done) {
        var id = null;
        organisationService.createStore(storeStub).then(res => {
            assert(res.id);
            id = res.id;
            return organisationService.updateStore({ id: id, names : [{ text : 'Wellington' }]});
        }).then(res => {
            assert.equal(res.previous.names[0].text, 'Newmarket');
            assert.equal(res.current.names[0].text, 'Wellington');
            return organisationService.getStore({ id : id });
        }).then(res => {
            assert(res.id);
            return organisationService.listStores({ organisationId : organisationId, _userContext : {}});
        }).then(res => {
            assert(Array.isArray(res));
            assert.equal(res.length, 1);
            return organisationService.deleteStore({ id : id });
        }).then(function(){
            done();
        }).catch(function (e) {
            done(e)
        });
    });
});


