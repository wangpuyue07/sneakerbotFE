var userService = require('../users/userService');
var activityService = require('./activityService');
var service = require('./../application/serviceUtils');
var spotService = require('./../spots/spotService');
var objects = require('../objects');
var constants = require('./../constants');
var async = require('async');
var S = require('string');
var Joi = require('joi');
var _ = require('lodash');
var util = require('util');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.comment);

/**
 * @param command
 * @param command.objectId {string} The item that is being commented on.
 * @param command.objectType {string} The type of item that is being commented on.
 * @param command.comment {string} The actual comment.
 * @param command._userContext
 * @param [command.cid] {string} Client generated id.
 * @param [command.parentActivityId] {uuid}
 * match a client generated item which is eventually consistent
 * with the backend.
 * @returns {*}
 */
exports.createComment = function (command) {
    var rules = service.createRules({
        recipientId: Joi.string().guid().required(),
        parentActivityId: Joi.string().guid(),
        objectId: Joi.string().required(),
        subObjectId: Joi.string(),
        subObjectType: Joi.allow(Object.keys(constants.entityTypes)),
        objectType: Joi.allow(Object.keys(constants.entityTypes)),
        comment: Joi.string().required(),
        imageUrl : Joi.string().regex(constants.regex.url),
        mentions: Joi.array().items(Joi.string().guid()),
        cid: Joi.string()
    });
    if(!command._userContext.id) throw new service.ForbiddenError();
    service.validateSync(command, rules);
    return activityService.createActivityWithContextAsSubject({
        _userContext : command._userContext,
        recipientId: command.recipientId,
        parentActivityId: command.parentActivityId,
        action: constants.actions.commented,
        bodyType: constants.entityTypes.comment,
        objectId: command.objectId,
        objectType: command.objectType,
        comment: command.comment,
        storeId: command._userContext.id,
        mentions: command.mentions,
        cid: command.cid
    });
};

exports.updateComment = function (command) {
    var schema = {
        id: Joi.string().guid().required(),
        comment: Joi.string()
    };
    service.validateSync(command, schema);
    return activityService.updateActivity(command);
};

exports.deleteComment = function (command) {
    var schema = {
        id: Joi.string().guid().required()
    };
    service.validateSync(command, schema);
    return activityService.deleteActivity(command);
};

exports.voteOnComment = function (command) {
    var schema = {
        commentId: Joi.string().required(),
        entityId: Joi.string().required(),
        userId: Joi.required(),
        score: Joi.number().min(-1).max(1).integer().required()
    };
    service.validateSync(command, schema);
    var query = 'SELECT "score" from user_comments_scores where "entityId" = ? AND "userId" = ? AND "commentId" = ?';
    return client().executeAsync(query, [command.entityId.toString(), command.userId, command.commentId], {prepare: true}).then(function (res) {
        var existingScore = 0;
        if (res.rows.length !== 0) existingScore = res.rows[0].score;
        var scoreDelta = command.score - existingScore;
        var queries = {
            entityCommentScore: client().createQuery('UPDATE entity_comments_scores set score=score + ? where "entityId" = ? and "commentId" = ?', [scoreDelta, command.entityId, command.commentId]),
            userCommentScore: client().createQuery('UPDATE user_comments_scores set "score" = ? where "userId" = ? and "entityId" = ? and "commentId" = ?', [command.score, command.userId, command.entityId, command.commentId])
        };
        return async.parallelAsync(queries);
    })
};