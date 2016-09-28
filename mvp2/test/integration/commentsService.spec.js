var commentService = require('../../lib/activity/commentService');
var activityService = require('../../lib/activity/activityService');
var sql = require('../../lib/application/providers/sqlClient');
var constants = require('../../lib/constants');
var assert = require('assert');
var objectId = '13a89d80-876d-11e4-bc10-f30b60203ed3';
var recipientId = '13a89d80-876d-11e4-bc10-f30c60203ed1';
var stubs = require('./../stubs');

describe('commentsService', function () {

    beforeEach(done => {
        done();
    });

    afterEach(done => {
        sql.db.models.activities.destroy({truncate: true}).then(x =>{
            done();
        });
    });

    var commentStub = {
        objectId : objectId,
        objectType : constants.entityTypes.feedback,
        comment : 'youre a dillbuck',
        recipientId : recipientId,
        mentions: ['13a89d80-876d-11e4-bc10-f30c60203eb1'],
        _userContext : stubs.userContext
    };

    it('Should create, edit, and delete comment from entity', function(done){
        var editedText = 'You\'re a big monkey @dilbo';
        var comment;
        commentService.createComment(commentStub).then(function(){
            return activityService.listActivities({ objectId : objectId });
        }).then(function(res) {
            comment = res[0];
            assert.equal(comment.comment, 'youre a dillbuck');
            assert.deepEqual(comment.mentions, commentStub.mentions);
            assert.equal(res.length, 1);
            return commentService.updateComment({ id : comment.id, comment : editedText });
        }).then(function(res){
            return activityService.listActivities({objectId: objectId});
        }).then(function(res){
            assert.equal(res[0].comment, editedText);
            return commentService.deleteComment({ id : comment.id });
        }).then(function(res){
            return activityService.listActivities({objectId: objectId});
        }).then(function(res){
            assert.equal(res.length, 0);
            done();
        }).catch(function(e){
            done(e);
        })
    });

    it('Should create reply to comment and return a nested structure of comments', done => {
        var replyText = 'No Im not';
        var replyText2 = 'I suspect you are!';
        var comment;
        commentService.createComment(commentStub).then(function(res){
            comment = res;
            return commentService.createComment({ recipientId : recipientId, objectId : objectId, objectType : constants.entityTypes.feedback, _userContext: stubs.userContext, comment: replyText, parentActivityId : comment.id });
        }).then(function(){
            return commentService.createComment({ recipientId : recipientId, objectId : objectId, objectType : constants.entityTypes.feedback, _userContext: stubs.userContext, comment: replyText2, parentActivityId : comment.id });
        }).then(function(){
            return activityService.listActivities({ objectId : objectId });
        }).then(function(res){
            assert.equal(res[0].replies.length, 2);
            assert.equal(res[0].replies[0].comment, replyText);
            assert.equal(res[0].replies[1].comment, replyText2);
            done();
        }).catch(function(e){
            done(e);
        })
    });


});