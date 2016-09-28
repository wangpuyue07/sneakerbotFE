var utils = require('../../lib/application/genUtils');
var requestService = require('../../lib/requestService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');
var stubs = require('./../stubs');

describe('requestService', () => {

    afterEach(function (done) {
        Promise.all([
            sql.models.requests.destroy({truncate: true})
        ])
            .then(() => {
                done();
            });
    });

    var requestStub = {
        sku: 'ACDG-234kjsdf',
        description: 'Its really good.',
        colour: 'Red',
        size : 'XL',
        productType : 'Shirts',
        expiry: new Date(2020, 10, 10).toISOString(),
        customerName: 'Ron Dillsbury',
        customerPhone: '0203 435543',
        _userContext: stubs.userContext
    };

    it('Should Create, update, list and delete staff request', function (done) {
        var id = null;
        requestService.createRequest(requestStub).then(res => {
            assert(res.id);
            id = res.id;
            return requestService.updateRequest({id: id, description: 'New description', _userContext: stubs.userContext });
        }).then(res => {
            assert.equal(res.previous.description, requestStub.description);
            assert.equal(res.current.description, 'New description');
            return requestService.getRequest({id: id, _userContext: stubs.userContext });
        }).then(res => {
            assert.deepEqual(res.tags, requestStub.tags);
            assert(res.id);
            return requestService.listRequest({staffId: requestStub.staffId, _userContext: stubs.userContext});
        }).then(res => {
            assert(Array.isArray(res));
            assert.equal(res.length, 1);
            return requestService.deleteRequest({id: id, _userContext: stubs.userContext });
        }).then(function () {
            done();
        }).catch(function (e) {
            done(e)
        });
    });

});


