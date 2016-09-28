var appFiles = require('./client/appFiles');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'client',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: appFiles.seekstock,

        // list of files to exclude
        //exclude: appFiles.testingExclusions,


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // reading the coverage report: https://github.com/docdis/learn-istanbul
        // preprocessors: {
        //     'public/app/**/*.js' : ['coverage']
        // },

        // test results reporter to use
        // possible values: 'dots', 'progress'ß
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['spec', 'coverage'],
        reporters: ['spec'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [ process.env.SINGLE_RUN ? 'Chrome_without_sandbox' : 'ChromeSmall'],


        customLaunchers: {
            ChromeSmall: {
                base: 'Chrome',
                flags: ['--window-size=400,400']
            },
            Chrome_without_sandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox'] // with sandbox it fails under Docker
            }
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun:  process.env.SINGLE_RUN ? true : false
    })
};