var utils = require('../../lib/application/genUtils');
var assert = require('assert');


describe('genUtils', () => {
    it('Should get domain and address from email', () => {
        var emailStruct = utils.getEmailStruct('richard@seekstock.co.nz');
        assert(Object.keys(emailStruct).length > 0);
        assert.equal(emailStruct.domain, 'seekstock.co.nz');
        assert.equal(emailStruct.address, 'richard');
    });

    it('Given no email should throw an error when getting the email struct', () => {
        try{
            assert.equal(utils.getEmailStruct(undefined), 'seekstock.co.nz');
        } catch (e) {
            assert.equal(e.message, 'The email provided is not valid. undefined')
        }
    })
});