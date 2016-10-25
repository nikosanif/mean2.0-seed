'use strict';

var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    shell = require('shelljs'),
    gutil = require('gulp-util');


gulp.task('e2e.update', (done) => {
    //Install/update webdriver requirements for Protractor e2e testing
    console.log('Protractor webdriver-manager update')
    var webdriverBin = path.join(require.resolve('protractor'), '../..', 'bin/webdriver-manager').normalize();
    shell.exec('node ' + webdriverBin + ' update', function (code, output) {
        console.log(output);
        if (code !== 0) {
            process.exit(code);
        }

        done();
    });
});

gulp.task('e2e.runProtractor', (done) => {
    shell.exec('node node_modules/protractor/bin/protractor tests/config/e2e/protractor.config.js', function (code, output) {
        done();
    });
});

gulp.task('stopServer:e2e', () => {
    process.exit();
});

gulp.task('startServer:e2e', () => {
    try {
        require("../_dist/app/server/server.js").run(function (err) {
            if (err) process.exit(10);
            runSequence("e2e.runProtractor", "stopServer:e2e");
        });
    }
    catch (err) {
        gutil.log(gutil.colors.red('Build task is required. Please run: gulp build \n'), err);
    }
});


//require build task: gulp build
gulp.task('test:e2e', () => {
    runSequence("env:test", "e2e.update", "startServer:e2e");
});

