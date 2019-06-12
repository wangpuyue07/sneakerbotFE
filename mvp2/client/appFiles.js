/**
 * Shared File/Dependency configuration for Gruntfile.js olive-karma.conf.js tests.
 *
 **/

var root = './';

exports.external = [
    'angular/angular.js',
    'angular-mocks/angular-mocks.js',
    'angular-cookies/angular-cookies.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-resource/angular-resource.js',
    'angular-sanitize/angular-sanitize.js',
    'angular-bootstrap/ui-bootstrap.js',
    'angular-validation-match/dist/angular-validation-match.js',
].map(function(file){ return root + 'bower_components/' + file; });

exports.templates = [
    root + 'gen/essence-olive-3-frontend-templates.js'
];

exports.seekstock = exports.external.concat([
    'app/app.js',
    'components/**/*.js',
    'app/**/*.module.js',
    'app/**/*.js',
    'app/**/*.spec.js'
].map(function(file){ return root + file; }));
exports.testing = exports.external.concat(
  //  [ 'test/helpers/**/*.module.js', 'test/helpers/!**/!*.service.js' ],
    //exports.templates,
    [root + 'app/**/*.spec.js']
);

// exports.testingExclusions = [
//     'app/gen/*.*',
//     'app/service/resource/worker2.0/**/*.js',
//     'app/service/resource/worker/API.js',
//     'app/livereload.js'
// ].map(function(file){ return root + file });