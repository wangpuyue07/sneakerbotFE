var config = require('./config');
var express = require('express');
var app = express();
var raven = require('raven');
var http = require("http");
var EventEmitter = require('events').EventEmitter;
module.exports = new EventEmitter();
var fs = require('fs');
var logger = require('./lib_new/application/logger')('app.js');
var sql = require('./lib_new/application/providers/sqlClient');

var server = require('http').createServer(app);

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//require('./lib/handlers/index');
require('./lib_new/handlers/index');

var swig = require('swig');
var path = require('path');
var passport = require('passport');
var cookieSession = require('cookie-session');

app.use(raven.middleware.express.requestHandler(config.sentry.dsn));
app.use(raven.middleware.express.errorHandler(config.sentry.dsn));
app.use(cookieParser('23sdf23sdf$£!@'));
app.use(cookieSession({keys: ['dfkj£234', '23498908*(']}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.set('view cache', false);
swig.setDefaults({cache: false});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use(require('./middleware/tokenAuthentication').hydrateProfile);


app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , x-seekstock-staffId');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});



require('./routes/allRoutes')(app);
require('./middleware/errorHandling')(app);

function start() {
    var port = process.env.PORT || config.port;
    if(process.env.DOMAIN!='localhost:3000'){
        var options = {
            key: fs.readFileSync('/etc/letsencrypt/live/'+process.env.DOMAIN+'/privkey.pem'),
            cert: fs.readFileSync('/etc/letsencrypt/live/'+process.env.DOMAIN+'/fullchain.pem')
        };
        var httpsServer = require('https').createServer(options,app);
        httpsServer.listen(port);
        http.createServer(function(request, response) {
            response.end("<script>window.location.href='"+ process.env.HOST +"'</script>");
        }).listen(3500);
        logger.info('** listening https on port: ' + port);
    }else{
        server.listen(port);
        logger.info('** listening http on port: ' + port);
    }
    module.exports.emit('started');

}

require('./lib_new/bagpipes').configure(config).then(function () {
    start();
    require('./lib_new/base_service/staffService').cacheStaffs({}).then(res =>{
        require('./lib_new/base_service/storeService').cacheStores({}).then(res =>{
            logger.info('Loading cache finished.');
        });
    });
});
