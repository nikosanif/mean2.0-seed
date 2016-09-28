"use strict";

const gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    //tslint = require('gulp-tslint'),
    //concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    gulpTypings = require("gulp-typings");


var paths = {
    appfile: "dist/app.js",
    build: {
        root: "dist",
        server: "dist/server",
        client: "dist/client"
    },
    server: {
        root: "src/server/",
        js: "src/server/**/*.js"
    },
    client: {
        root: "src/client/",
        tsconfig: "src/client/tsconfig.json",
        tsfiles: "src/client/**/*.ts"
    }
};



/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */

gulp.task("build", function (callback) {
    runSequence('clean', 'build:server', 'build:client', 'resources:server', 'resources:client', callback);
});

gulp.task("deploy", function (callback) {
    runSequence('clean', 'build:server', 'build:client', 'resources:server', 'resources:client', 'watch', 'start');
});

gulp.task('clean', (cb) => {
    return del([paths.build.root], cb);
});

gulp.task('default', function () {
    runSequence('clean', 'build:server', 'build:client', 'resources:server', 'resources:client', 'watch', 'start');
});





//============================ SERVER ==============================

gulp.task('build:server', function () {
    return gulp.src([paths.server.js])
        .pipe(gulp.dest(paths.build.server));
});

gulp.task("resources:server", () => {
    return gulp.src(["./app.js"])
        .pipe(gulp.dest("./dist"));
});



//============================ CLIENT ==============================

gulp.task('build:client', function () {
    var tsProject = tsc.createProject(paths.client.tsconfig);
    var tsResult = gulp.src(paths.client.tsfiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject()))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.client))
});

/**
 * Copy all resources that are not TypeScript files into build directory. 
 * e.g. index.html, css, images
 */
gulp.task("resources:client", () => {
    return gulp.src(["src/client/**/*", "!**/*.ts", "!src/client/typings", "!src/client/typings/**", "!src/client/*.json"])
        .pipe(gulp.dest(paths.build.client));
});


//============================ UTILS ==============================

gulp.task("installTypings", function () {
    var stream = gulp.src(["./src/client/typings.json"])
        .pipe(gulpTypings(null)); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

gulp.task("watch", () => {
    gulp.watch(["src/client/**/*.ts"], ['build:client']).on('change', function (e) {
        notify('TypeScript file ' + e.path + ' has been changed. Compiling...');
    });

    gulp.watch(["src/client/**/*.html", "src/client/**/*.css"], ['resources:client']).on('change', function (e) {
        notify('Resource file ' + e.path + ' has been changed. Updating...');
    });

    gulp.watch(["src/server/**/*.js"], ['build:server']).on('change', function (e) {
        notify('Javascript file ' + e.path + ' has been changed. Compiling...');
    });
});

gulp.task('start', function () {
    //livereload.listen();
    nodemon({
        script: paths.appfile,
        ext: 'js html',
        env: { 'NODE_ENV': 'dev' }
    })
    .on('restart', function () {
        gulp.src(paths.appfile)
			//.pipe(livereload())
			.pipe(notify('App restarted...'));
    });
})
