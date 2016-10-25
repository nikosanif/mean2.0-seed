'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var paths = {
  server: "../_dist/app/server/server.js",
  testFiles: ["./tests/specs/**/*.js", "!./tests/coverage/**"],
  coverageOutputFolder: "./tests/results/coverage"
}


gulp.task('env:test', () => {
  process.env.NODE_ENV = 'test';
});

gulp.task('startServer:test', (done) => {
  require(paths.server).run(function (err) {
    if (err) process.exit(10);
    runSequence("runMocha");
  });
});

gulp.task('runMocha', () => {
  gulp.src(paths.testFiles, { read: false })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('error', (error) => {
      console.error(error);
      gutil.log(gutil.colors.red('Tests failed!'));
      process.exit(1);
    })
    .once('end', () => {
      gutil.log(gutil.colors.green('Tests finished successfully!'));
      process.exit();
    })
});

gulp.task('test', () => {
  runSequence("env:test", "build", "startServer:test");
});





/*
* Code coverage for testing based on 
* Instanbul: https://github.com/gotwarlost/istanbul
*
* TODO: configure source files for coverage
*/

gulp.task('pre-test', () => {
  return gulp.src(['./src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('createCoverageReport', (done) => {
  return gulp.src(paths.testFiles)
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
      dir: paths.coverageOutputFolder
    }))
    // Enforce a coverage of at least 90%
    /*.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))*/
    .once('error', (error) => {
      console.error(error);
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
});

gulp.task('startServer:coverage', (done) => {
  require(paths.server).run((err) => {
    if (err) {
      console.error(err);
      process.exit(10);
    }
    runSequence("pre-test", "createCoverageReport");
  });
});

gulp.task('test:coverage', () => {
  runSequence("env:test", "build", "startServer:coverage");
});