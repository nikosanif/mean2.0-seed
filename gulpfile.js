'use strict';

var gulp = require('gulp');

// read gulp directory contents for tasks...
require('require-dir')('./gulp');


gulp.task('default', ['development']);
