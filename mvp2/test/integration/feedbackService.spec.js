var utils = require('../../lib/application/genUtils');
var feedbackService = require('../../lib/feedbackService');
var sql = require('../../lib/application/providers/sqlClient');
var assert = require('assert');
var stubs = require('./../stubs');

describe('feedbackService', () => {

    afterEach(function (done) {
        Promise.all([
            sql.models.feedback.destroy({truncate: true})
        ])
            .then(() => {
                done();
            });
    });

    var feedbackStub = {
        sku: 'ACDG-234kjsdf',
        description: 'Its really good.',
        tags : ['size', 'colour'],
        appliesTo : ['Red'],
        _userContext: stubs.userContext
    };

    it('Should Create, update, list and delete staff feedback', function (done) {
        var id = null;
        feedbackService.createFeedback(feedbackStub).then(res => {
            assert(res.id);
            id = res.id;
            return feedbackService.updateFeedback({id: id, description: 'New description', _userContext: stubs.userContext });
        }).then(res => {
            assert.equal(res.previous.description, feedbackStub.description);
            assert.equal(res.current.description, 'New description');
            return feedbackService.getFeedback({id: id, _userContext: stubs.userContext });
        }).then(res => {
            assert.deepEqual(res.tags, feedbackStub.tags);
            assert.deepEqual(res.appliesTo, feedbackStub.appliesTo);
            assert(res.id);
            return feedbackService.listFeedback({staffId: feedbackStub.staffId, _userContext: stubs.userContext});
        }).then(res => {
            assert(Array.isArray(res));
            assert.equal(res.length, 1);
            return feedbackService.deleteFeedback({id: id, _userContext: stubs.userContext });
        }).then(function () {
            done();
        }).catch(function (e) {
            done(e)
        });
    });

});


