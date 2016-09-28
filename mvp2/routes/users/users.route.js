var route = require('express').Router();
var userService = require('../../lib/users/userService');
var spotService = require('../../lib/spots/spotService');
var service = require('../../lib/application/serviceUtils');

route.get('/:id', service.handleWith(spotService.getSpot, {
    inMappers: [function(command, req){
       if(command.id === 'me')  command.id = req.profile.id;
        return command;
    }]
}));

route.post('/', service.handleWith(userService.signUp, { responseType : service.responseTypes.full, setCookie: true }));

route.post('/sign-in', service.handleWith(userService.signIn, { responseType : service.responseTypes.full, setCookie: true }));

route.get('/check-username/:username', service.handleWith(userService.checkUserName));

route.post('/create-password-reset-code', service.handleWith(userService.createPasswordResetCode,
    { responseType : service.responseTypes.fullOrEmpty }
));

route.get('/check-password-reset-code/:code', service.handleWith(userService.checkPasswordResetCode));

route.post('/reset-password-with-code', service.handleWith(userService.changePasswordWithCode,
    { responseType : service.responseTypes.empty }));

route.delete('/:id', service.handleWith(userService.deleteUser));

module.exports = route;
