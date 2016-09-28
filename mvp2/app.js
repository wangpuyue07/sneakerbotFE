var config = require('./config');
var express = require('express');
var app = express();
var raven = require('raven');

var EventEmitter = require('events').EventEmitter;
module.exports = new EventEmitter();
var fs = require('fs');
var logger = require('./lib/application/logger')('app.js');
var sql = require('./lib/application/providers/sqlClient');

var server = require('http').createServer(app);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./lib/handlers/index');
var swig = require('swig');
var path = require('path');
var passport = require('passport');
var cookieSession = require('cookie-session');

app.use(raven.middleware.express.requestHandler(config.sentry.dsn));
app.use(raven.middleware.express.errorHandler(config.sentry.dsn));

app.use(cookieParser('23sdf23sdf$£!@'));
app.use(cookieSession({keys: ['dfkj£234', '23498908*(']}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view cache', false);
swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use(require('./middleware/tokenAuthentication').hydrateProfile);

require('./routes/allRoutes')(app);
require('./middleware/errorHandling')(app);

function start() {
    var port = process.env.PORT || config.port;
    server.listen(port);
    module.exports.emit('started');
    logger.info('** listening on port: ' + port);
}

require('./lib/bagpipes').configure(config).then(function () {
    start();
});