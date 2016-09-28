var config = {};

if ('production' == process.env.NODE_ENV) {
    config.mode = 'production';
} else {

    config.mode = 'development';
    config.notProduction = true;
}

config.host = process.env.HOST;
config.redis = {host: 'redis', port: process.env.REDIS_DEV_PORT || 6379, password: null};

config.mysql = { connectionString :  'mysql://root@mysql:' + (process.env.MYSQL_DEV_PORT || 3308) + '/seekstock' };

config.vend = {
    appId: process.env.VEND_ID || 'id',
    appSecret: process.env.VEND_SECRET || 'secret'
};
config.google = {
    appId: process.env.GOOGLE_ID || 'id',
    appSecret: process.env.GOOGLE_SECRET || 'secret'
};

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

console.log('-- Starting %s mode --', config.mode);
module.exports = config;

// Declaration of sess simply to prevent code analysis from marking 'sess' as unknown
var req = {sess: ''};