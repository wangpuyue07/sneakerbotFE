var cassandra = require('cassandra-driver');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var q = require('q');
var stream = require('stream');
var util = require('util');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config');

exports.toTitleCase = function(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

exports.getEmailStruct = function(email) {
    if(!/\S+@\S+\.\S+/.test(email)) throw new Error('The email provided is not valid. ' + email);
    var tokens = email.split('@');
    return { domain : tokens[1], address : tokens[0] };
};

exports.createApiKey = function(salt){
    if(!salt) throw new Error('No salt provided.');
    return crypto.createHash('sha256').update(Date.now().toString()).update(salt).update('23jlkjsdfkj8787kj£').digest('hex');
};

exports.createPassword = function (length) {
    var passwordArray = [];
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        passwordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    return passwordArray.join('');
};

var encryptPassword = function (password) {
    return bcrypt.genSaltAsync(process.env.NODE_ENV == 'production' ? 10 : 5).then(function (salt) {
        return bcrypt.hashAsync(password, salt);
    }).then(function (hash) {
        return hash;
    });
};

exports.comparePassword = function (password, hash) {
    return bcrypt.compareAsync(password, hash);
};

exports.createToken = function (characters) {
    if(!characters || characters.length < 20) throw new RangeError('You must specify at least 20 chars to create a token.');
    var deferred = q.defer();
    crypto.randomBytes(characters, function (ex, buffer) {
        var token = buffer.toString('hex');
        deferred.resolve(token);
    });
    return deferred.promise;
};

exports.createTimeUuid = function () {
    return cassandra.types.timeuuid();
};

exports.fullJsonParse = function(str){
    var parsed = JSON.parse(str);
    var dateCheck = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    for(var i in parsed){
        if(!parsed.hasOwnProperty(i)) continue;
        if(dateCheck.test(parsed[i])){
            parsed[i] = new Date(parsed[i]);
        }
    }
    return parsed;
};

/**
 * Piped Array Notation. Used for storing queryable arrays in SQL.
 * @constructor
 */
exports.PNAN = {
    parse : function(str){
        if(!str) return [];
        var array = str.split('|');
        array.pop();
        array.shift();
        array.forEach(function(item){
            if(!isNaN(item)) item = parseInt(item)
        });
        return array;
    },
    stringify : function(array){
        array = array || [];
        if(Array.isArray(array)) {
            if(array.length === 0) return null;
            return '|' + array.join('|') + '|';
        }
        throw new RangeError('Input is not an array.');
    }
};

/**
 *
 * @param userId User id
 * @returns {String}
 */
exports.createJwtToken = function(userId) {
    return jwt.encode(new JwtToken(userId), config.jwtSecret, 'HS512');
};

var JwtToken = function(id){
    this.iss = id;
    this.exp = moment().add('days', 180).valueOf();
};

function ArrayStream(input, options) {
    options = options || {objectMode: true};
    stream.Readable.call(this, options);
    this._items = input;
    this._index = 0;
}

util.inherits(ArrayStream, stream.Readable);
ArrayStream.prototype._read = function () {
    var i = this._index++;
    if (i < this._items.length) {
        this.push(this._items[i]);
    } else {
        this.push(null);
    }
};

exports.ArrayStream = ArrayStream;