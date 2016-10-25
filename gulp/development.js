'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence'),
  nodemonDebugPort = require('../app/server/config/env/development').nodemon.debugPort;


//Set environmet: development
gulp.task('env:development', () => {
  process.env.NODE_ENV = 'development';
});



/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', () => {
  gutil.log(gutil.colors.yellow('Watch: '), "app/client/**/*.ts");
  gutil.log(gutil.colors.yellow('Watch: '), "app/client/**/*.html/css/scss");
  gutil.log(gutil.colors.yellow('Watch: '), "app/server/**/*.js");

  gulp.watch(["app/client/**/*.ts"], ['compile']).on('change', function (e) {
    gutil.log(gutil.colors.magenta('TypeScript file changed: ' + e.path));
  });

  gulp.watch(["app/client/**/*.html", "app/client/**/*.css"], ['client:copy:resources']).on('change', function (e) {
    gutil.log(gutil.colors.magenta('Resource file changed: ' + e.path));
  });

  gulp.watch('app/client/**/*.scss', ['client:sass']).on('change', function (e) {
    gutil.log(gutil.colors.magenta('SASS file changed: ' + e.path));
  });

  gulp.watch(["app/server/**/*.js"], ['build:server']).on('change', function (e) {
    gutil.log(gutil.colors.magenta('Javascript file changed: ' + e.path));
  });

  gulp.watch(["app.js"], ['copy:server:resources']).on('change', function (e) {
    gutil.log(gutil.colors.magenta('Javascript file changed: ' + e.path));
  });
});



/**
 * START PROJECT
 */
gulp.task('start:dev', () => {

  nodemon({
    script: '_dist/app.js',
    ext: 'html js',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: [
      'node_modules/',
      'bower_components/',
      'logs/',
      '.DS_Store', '**/.DS_Store',
      '.bower-*',
      '**/.bower-*',
      '**/tests'
    ],
    nodeArgs: ['--debug=' + nodemonDebugPort]
  })
    .on('restart', function () {
      console.log('App restarted!');
    });
});



gulp.task('development', (cb) => {
  runSequence('env:development', 'build', 'start:dev', 'watch', cb);
});
