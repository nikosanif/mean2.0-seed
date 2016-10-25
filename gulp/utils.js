"use strict";

var gulp = require("gulp"),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json"),
    gulpTypings = require("gulp-typings"),
    tslint = require('gulp-tslint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require("del");

/**
 * Clean Utils
 */
gulp.task('clean', (cb) => {
    var filePaths = ["./_dist"];
    filePaths.forEach((f) => {
        gutil.log(gutil.colors.red('Delete: '), f);
    });
    return del(filePaths, cb);
});

gulp.task('clean:basic', (cb) => {
    var filePaths = ["./_dist", "./app/client/typings", "./tests/results"];
    filePaths.forEach((f) => {
        gutil.log(gutil.colors.red('Delete: '), f);
    });
    return del(filePaths, cb);
});

gulp.task('clean:all', (cb) => {
    var filePaths = ["./_dist", "./app/client/typings", "./tests/results", "./node_modules"];
    filePaths.forEach((f) => {
        gutil.log(gutil.colors.red('Delete: '), f);
    });
    return del(filePaths, cb);
});

/**
 * Install typings for client.
 */
gulp.task("installTypings", () => {
    var stream = gulp.src(["./app/client/typings.json"])
        .pipe(gulpTypings(null)); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});


/**
 * Build entire Project.
 */
gulp.task('build', (cb) => {
    runSequence('clean', 'build:server', 'build:client', cb);
});


/**
 * Build Server.
 */
gulp.task('build:server', ["copy:server:resources"], () => {
    return gulp.src(["./app/server/**/*.js"])
        .pipe(gulp.dest("./_dist/app/server/"));
});

gulp.task('copy:server:resources', () => {
    return gulp.src(["./app.js"])
        .pipe(gulp.dest("./_dist/"));
});


/**
 * Build Client.
 */
gulp.task('build:client', (cb) => {
    runSequence('client:build:files', 'client:copy:resources',
        'client:libs', 'client:css', cb);
});

gulp.task('client:build:files', () => {
    var tsProject = tsc.createProject('./app/client/tsconfig.json');
    var tsResult = gulp.src('./app/client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./_dist/app/client/'));
});

gulp.task('client:copy:resources', () => {
    return gulp.src(["app/client/**/*", "!**/*.ts", "!app/client/**/*.scss",
        "!app/client/typings", "!app/client/typings/**", "!app/client/*.json"])
        .pipe(gulp.dest("_dist/app/client"));
});

gulp.task('client:libs', () => {
    return gulp.src([
        'core-js/client/**',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'reflect-metadata/Reflect.js.map',
        'systemjs/dist/system.src.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("_dist/app/client/libs"));
});

gulp.task('client:css', ['client:css:bootstrap-jquery', 'client:sass']);

gulp.task('client:css:bootstrap-jquery', () => {
    return gulp.src([
        'bootstrap/dist/**/**',
        'jquery/dist/**/**',
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("_dist/app/client/libs/"));
});

gulp.task('client:sass', () => {
    return gulp.src('./app/client/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./_dist/app/client'));
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {
    var tsResult = gulp.src("./app/client/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./_dist/app/client"));
});