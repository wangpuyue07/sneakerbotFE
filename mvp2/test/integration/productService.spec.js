var utils = require('../../lib/application/genUtils');
var productService = require('../../lib/productService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');
var stubs = require('./../stubs');

describe('productService', () => {

    it('Should get product', function (done) {
        productService.getProduct({sku: 'ILUAPR126', _userContext: stubs.userContext}).then(res => {
            assert.equal(res.description, 'Jonty Pant Copper');
        }).then(function () {
            done();
        }).catch(function (e) {
            done(e)
        });
    });

    it('Should List products', function (done) {
        productService.listProducts({_userContext: stubs.userContext}).then(res => {
            assert(Array.isArray(res));
            assert(Array.isArray(res[0].variations));
            assert.equal(res.length, 1342);
        }).then(function () {
            done();
        }).catch(function (e) {
            done(e)
        });
    });


    // it('Create product index', function (done) {
    //     productService.listProducts({_userContext: stubs.userContext}).then(res => {
    //         var jsonfile = require('jsonfile');
    //         jsonfile.writeFile(process.cwd() + '/' + 'products' + new Date().toISOString() + '.json', res, function (err) {
    //             console.error(err);
    //         });
    //     }).then(function () {
    //         done();
    //     }).catch(function (e) {
    //         done(e)
    //     });
    // });
});

