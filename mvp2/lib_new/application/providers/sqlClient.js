var Sequelize = require('sequelize');
var modelFactory = require('../../sqlModels/_modelFactory.js');
var log = require('../logger')('providers/sql');
var constants = require('../constants');
var config = require('../../../config');

exports.db = db = new Sequelize(config.mysql.connectionString, {
    logging: config.logSql,
    pool: {maxConnections: 15, maxIdleTime: 30},
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
    }
});
log.info('Connected to MYSQL:', db.config.host, db.config.port, db.config.database);

exports.sync = function () {
    return db.sync({force: true}).then(function () {
        log.info('MYSQL schema created.');
    })
};

exports.models = modelFactory.create(db);