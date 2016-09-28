var utils = require('../../lib/application/genUtils');
var staffService = require('../../lib/spots/staffService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');
var stubs = require('./../stubs');

describe('staffService', () => {

    afterEach(function (done) {
        sql.models.spots.destroy({ truncate : true }).then(() => {
            done();
        });
    });

    var organisationId = 'ae1ad665-6371-44aa-ad55-017961330b8b';
    var storeId = 'ae1ad665-6371-44aa-ad55-017961330b8e';


    var staffStub = {
        names : [{ text : 'Johnny Smith' }],
        email : 'newmarket@seekstock.co.nz',
        organisationId : organisationId,
        storeId: storeId,
        _userContext : stubs.userContext
    };

    it('Should Create, update, list and delete a staff member', function (done) {
        var id = null;
        staffService.createStaff(staffStub).then(res => {
            assert(res.id);
            id = res.id;
            return staffService.updateStaff({ id: id, names : [{ text : 'John' }], _userContext : stubs.userContext});
        }).then(res => {
            assert.equal(res.previous.names[0].text, 'Johnny Smith');
            assert.equal(res.current.names[0].text, 'John');
            assert.equal(res.current.slug, 'johnny_smith');
            return staffService.listStaff({organisationId: organisationId, storeId: storeId, _userContext : stubs.userContext});
        }).then(res => {
            assert(Array.isArray(res));
            assert.equal(res.length, 1);
            return staffService.deleteStaff({ id : id , _userContext : stubs.userContext});
        }).then(function(){
            done();
        }).catch(function (e) {
            done(e)
        });
    });
});


