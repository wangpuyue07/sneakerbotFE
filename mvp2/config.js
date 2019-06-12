
var events = require('./lib_new/application/eventBroker');
var config = {};

if ('production' == process.env.NODE_ENV) {
    config.mode = 'production';
} else {

    config.mode = 'development';
    config.notProduction = true;
}

config.algolia={clientId:'M96FY1SE39',key:'632024b3ded8e1171aa6385e7d11601c'};

config.host = process.env.HOST;
config.redis = {host: 'redis', port: process.env.REDIS_DEV_PORT || 6379, password: null};
config.domain = process.env.DOMAIN;
config.vend = {
    client_id:function () {
        switch (process.env.DOMAIN){
            case 'localhost:3000':
                return 'i8bJPTN9Ib59EykVabiJai7KvIfoG0qv';
            case 'test.seekstock.nz':
                return 'NSpwO6z20YFcsgTXFqQJbL1AGYx3kjMg';
            case 'worldbrand.seekstock.nz':
                return 'dsY3rej6HPH8CFDT0Kh4VOnSli1UX65J';
            case 'glassons.seekstock.nz':
                return 'jriMWertLLVQY56Aqz8zrCRZDm3spW8Z';
        }
    }(),
    client_secret:function () {
        switch (process.env.DOMAIN){
            case 'localhost:3000':
                return 's4s1Alg3CQAf7Z3kyLW6MKYzbctEdN2q';
            case 'test.seekstock.nz':
                return '8bl2B0IjKbXA58b90rixxQ2V4GPRHIGO';
            case 'worldbrand.seekstock.nz':
                return 'yKv86cr0J6mu2Rfb1BEbILYYtzsSYHGd';
            case 'glassons.seekstock.nz':
                return 'wEwdbMOYED98BmLP0xQspzdWBp5ta8Ng';
        }
    }(),
    redirect_uri: function () {
        switch (process.env.DOMAIN){
            case 'localhost:3000':
                return 'http://localhost:3000/';
            case 'test.seekstock.nz':
                return 'https://test.seekstock.nz/';
            case 'worldbrand.seekstock.nz':
                return 'https://worldbrand.seekstock.nz/';
            case 'glassons.seekstock.nz':
                return 'https://glassons.seekstock.nz/';
        }
    }()
}

config.mysql = { connectionString :  'mysql://root@mysql:' + (process.env.MYSQL_DEV_PORT || 3306) + '/seekstock' };

config.google = {
    appId: process.env.GOOGLE_ID || 'id',
    appSecret: process.env.GOOGLE_SECRET || 'secret'
};

config.mailgun = function () {
    switch (process.env.DOMAIN){
        case 'localhost:3000':
            return {
                api_key : 'key-8120ec44211caef5e1a49216ac2dbd28',
                domain : 'sandboxc1dd98b20bd64e4a81677ce36181c305.mailgun.org'
            };
        case 'test.seekstock.nz':
            return {
                api_key : 'key-8120ec44211caef5e1a49216ac2dbd28',
                domain : 'test.seekstock.nz'
            };
        case 'worldbrand.seekstock.nz':
            return {
                api_key : 'key-8120ec44211caef5e1a49216ac2dbd28',
                domain : 'worldbrand.seekstock.nz'
            };
        case 'glassons.seekstock.nz':
            return {
                api_key : 'key-8120ec44211caef5e1a49216ac2dbd28',
                domain : 'glassons.seekstock.nz'
            };
    }
}();

config.port = process.env.PORT || 3000;
config.logSql = process.env.LOG_SQL ? (process.env.LOG_SQL == 'true') : false;
config.imageBaseUrl = 'https://res.cloudinary.com/scoopt/image/upload';
config.session = {};
config.session.secret = '345JLKJ890d7SH!SDFLKJ';
config.session.key = 'sess';
config.session.duration = 8 * 60 * 60 * 1000;
config.session.activeDuration = 8 * 60 * 60 * 24;
config.sentry = {
    dsn : 'https://568c491c471e4bb69e8ae43952ae1d05:326e2d2496d449d98b7734f4b9a7272c@app.getsentry.com/81495'
};
config.jwtSecret = 'as£dfkjdf2£34s$diu';
config.mapquestKey = 'Fmjtd%7Cluur2q6t20%2Cax%3Do5-9a201r';
config.clientPath = 'client';
config.featureToggles = {};
config.featureToggles['feature_sigin_oauth'] = process.env['FEATURE_SIGIN_OAUTH'];

module.exports = config;

// Declaration of sess simply to prevent code analysis from marking 'sess' as unknown
var req = {sess: ''};

setInterval(function () {
    events.emit("everyHourPlanTask", {}, {}, {});
}, 1000*60*60);

setInterval(function () {
    events.emit("everyHalfMinPlanTask", {}, {}, {});
}, 1000*20);
