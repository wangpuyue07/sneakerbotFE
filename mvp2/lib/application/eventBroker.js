var EventEmitter2 = require('eventemitter2').EventEmitter2;
var events = new EventEmitter2({ wildcard: true, delimiter: ':' });
var logger = require('./logger')('EventBroker');

/**
 * Wrapper for event emitter emit.
 * Conceptually we want to emit all the data required to handle the event
 * Which means that it will maintain temporal accuracy. e.g. age is dynamic
 * and needs to be fixed when related to the time an event occurred.
 * @param path
 * @param current
 * @param previous
 * @param context
 */
exports.emit = function(path, current, previous, context){
    events.emit(path, { id : current.id, current : current, previous : previous, context: context });
};

exports.on = function(path, callback){
    if(process.env.HANDLE_EVENTS === 'true'){
        events.on(path, callback);
    }
};

events.onAny(function(data){
    if(process.env.LOG_EVENTS) logger.info('EVENT:' + this.event.join(':') + ':' + (data ? data.id : ''));
});

if(process.env.HANDLE_EVENTS !== 'true') logger.info('Skipping event handling. (HANDLE_EVENTS not specified)');