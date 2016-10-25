'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence');


//Set environmet: production
gulp.task('env:production', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('start:prod', () => {

  nodemon({
    script: '_dist/app.js',
    ext: 'html js',
    env: {
      'NODE_ENV': 'production'
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
    watch: false
  })
    .on('restart', function () {
      console.log('App restarted!');
    });
});

gulp.task('production', (cb) => {
  runSequence('env:production', 'build', 'start:prod', cb);
});