var uglify = require('gulp-uglify');
var config = require('./config');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('rimraf');
var filesize = require('gulp-filesize');
var changed = require('gulp-changed');
var minifyCss = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var templateCache = require('gulp-angular-templatecache');
var nodemon = require('gulp-nodemon');
var wiredep = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var watch = require('gulp-watch');

var gulp = require('gulp');

function getBowerPath(relativePath){
    return config.clientPath + '/bower_components/' + relativePath;
}

function getAppPath(relativePath){
    return config.clientPath + '/app/' + relativePath;
}

function outputPath(){
    return './public/dist';
}

var paths = {
    vendorJs: [
        'jquery/dist/jquery.js',
        'bootstrap/dist/js/bootstrap.min.js',
        'angular/angular.js',
        'angular-resource/angular-resource.js',
        'angular-cookies/angular-cookies.js',
        'angular-sanitize/angular-sanitize.js',
        'angular-bootstrap/ui-bootstrap-tpls.js',
        'lodash/dist/lodash.min.js',
        'angular-ui-router/release/angular-ui-router.js',
        'angular-validation-match/dist/angular-validation-match.min.js',
        'algoliasearch/dist/algoliasearch.angular.min.js',
        'Chart.js/Chart.js',
        //'pubnub/web/dist/pubnub.min.js',
        'moment/min/moment.min.js',
        'angular-moment/angular-moment.min.js',
        'angular-chart.js/dist/angular-chart.min.js',
        'ment.io/dist/mentio.js',
        'ment.io/dist/templates.js'
    ].map(getBowerPath),
    localJs : [getAppPath('**/*.js'), '!' + getAppPath('**/*.spec.js')],
    vendorCss: [
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-social/bootstrap-social.css',
        'font-awesome/css/font-awesome.min.css',
        'angular-chart.js/dist/angular-chart.min.css'
    ].map(getBowerPath),
    localCss: getAppPath('**/*.css'),
    templates: getAppPath('/**/*.html')
};

console.log(paths.localJs);

gulp.task('clean', function (cb) {
    rimraf('./public', cb)
});

/**
 * MAIN APPLICATION
 */


gulp.task('index', function(){
    var path = config.clientPath + '/index.html';
    return gulp.src(path)
        .pipe(changed(outputPath()))
        .pipe(gulp.dest(outputPath()));
});

gulp.task('vendorJs', function () {
    return gulp.src(paths.vendorJs)
        .pipe(changed(outputPath()))
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write('./'))
        //.pipe(gzip())
        .pipe(gulp.dest(outputPath()));
});

gulp.task('localJs', function () {
    return gulp.src(paths.localJs)
        .pipe(changed(outputPath()))
        .pipe(angularFilesort())
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat('local.min.js'))
        .pipe(sourcemaps.write('./'))
        //.pipe(gzip())
        .pipe(gulp.dest(outputPath()));
});

gulp.task('templates', function () {
    gulp.src(paths.templates)
        .pipe(changed(outputPath()))
        .pipe(templateCache({
            module : 'ssNg'
        }))
        //.pipe(gzip())
        .pipe(gulp.dest(outputPath()));
});

gulp.task('vendorCss', function () {
    return gulp.src(paths.vendorCss)
        .pipe(changed(outputPath()))
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCss({keepBreaks: true, debug: true}))
        //.pipe(gzip())
        .pipe(gulp.dest(outputPath()));
});

gulp.task('localCss', function () {
    return gulp.src(paths.localCss)
        .pipe(changed(outputPath()))
        .pipe(concat('local.min.css'))
        .pipe(minifyCss({keepBreaks: true, debug: true}))
        //.pipe(gzip())
        .pipe(gulp.dest(outputPath()));
});


gulp.task('css', ['localCss', 'vendorCss']);
gulp.task('js', ['localJs', 'vendorJs']);

gulp.task('default', ['index', 'js', 'css', 'templates'], () => {
    console.log('Gulp!');
});

// gulp.task('watch', function () {
//     watch([paths.js, paths.templates], batch((events, done) => {
//         gulp.start('default', done);
//     }));
// });

gulp.task('watch', function() {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.templates, ['templates']);
});