var _ = require('lodash');

function pathMatch(path, exclusions){
    for(var i in exclusions){
        if(path.indexOf(exclusions[i]) > -1) return true;
    }
};

module.exports = function (req, res, next){
    var exclusions = [
        '/api/users/check-username',
        '/api/users/check-password-reset-code',
        '/api/users/create-password-reset-code',
        '/api/users/sign-up'
    ];
    if(pathMatch(req.path, exclusions)) return next();
    if(req.profile) return next();
    if(req.path.indexOf('/api') == -1) return next();
    return res.status(403).end();
};
