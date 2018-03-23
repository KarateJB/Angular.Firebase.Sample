/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
"use strict";
var gulp = require('gulp');
var util = require('gulp-util');


var rename = require('gulp-rename');

var config = {
  production: !!util.env.production

};

var rootPath = {
  app: "./src/app/",
  packageLib: "./src/assets/lib-npm/", //library destination
  nmSrc: "./node_modules/" //library source
};


var restUri = {
  path_prod : rootPath.app + "/service/resturi.service.prod.ts",
  path_dev : rootPath.app + "/service/resturi.service.dev.ts"
}

//Restful service uri
//Command: > gulp build --production
// gulp.task('build-resturi-service', function () {

//   if (config.production==true) {
//     return gulp.src(restUri.path_prod)
//     .pipe(rename("resturi.service.ts"))
//     .pipe(gulp.dest(rootPath.app + '/service/'));
//   }
//   else {
//     return  gulp.src(restUri.path_dev)
//     .pipe(rename("resturi.service.ts"))
//     .pipe(gulp.dest(rootPath.app + '/service/'));
//   }

// })


//bootstrap
gulp.task('copy-bootstrap', function () {
  return gulp.src(rootPath.nmSrc + "/bootstrap/dist/css/bootstrap.min.css", {
    base: rootPath.nmSrc + '/bootstrap/dist/css/'
  }).pipe(gulp.dest(rootPath.packageLib + '/bootstrap/'));
});

//jquery
gulp.task('copy-jquery', function () {
  return gulp.src(rootPath.nmSrc + "/jquery/dist/jquery.min.js", {
    base: rootPath.nmSrc + '/jquery/dist/'
  }).pipe(gulp.dest(rootPath.packageLib + '/jquery/'));
});

//sweetalert2
gulp.task('copy-sweetalert2', function () {
  return gulp.src(rootPath.nmSrc + "/sweetalert2/dist/sweetalert2*", {
    base: rootPath.nmSrc + '/sweetalert2/dist/'
  }).pipe(gulp.dest(rootPath.packageLib + '/sweetalert2/'));
});

//ng2-toastr
gulp.task('copy-ng2-toastr', function () {
  return gulp.src([
    rootPath.nmSrc + "/ng2-toastr/bundles/ng2-toastr.min.css",
    rootPath.nmSrc + "/ng2-toastr/bundles/ng2-toastr.min.js",
  ], {
      base: rootPath.nmSrc + '/ng2-toastr/bundles/'
  }).pipe(gulp.dest(rootPath.packageLib + '/ng2-toastr/'));
});


//font-awesome
gulp.task('copy-fa-css', function () {
    return gulp.src(rootPath.nmSrc + "/font-awesome/fonts/*", {
        base: rootPath.nmSrc + '/font-awesome/fonts/'
    }).pipe(gulp.dest(rootPath.packageLib + '/font-awesome/fonts/'));
});

gulp.task('copy-fa-fonts', function () {
    return gulp.src(rootPath.nmSrc + "/font-awesome/css/font-awesome.min.css", {
        base: rootPath.nmSrc + '/font-awesome/css/'
    }).pipe(gulp.dest(rootPath.packageLib + '/font-awesome/css/'));
});

//angularfire2
gulp.task('copy-angularfire2', function () {
    return gulp.src(rootPath.nmSrc + "/angularfire2/bundles/angularfire2.umd.js", {
        base: rootPath.nmSrc + '/angularfire2/bundles/'
    }).pipe(gulp.dest(rootPath.packageLib + '/angularfire2/'));
});

//firebase
gulp.task('copy-firebase', function () {
    return gulp.src(rootPath.nmSrc + "/firebase/*.js", {
        base: rootPath.nmSrc + '/firebase/'
    }).pipe(gulp.dest(rootPath.packageLib + '/firebase/'));
});

//Watch
gulp.task('watch', function() {
    gulp.watch(restUri.path_dev, ['build-resturi-service']);
    // gulp.watch(restUri.path_prod, ['build-resturi-service']);
 });

gulp.task("default", [
  "watch"
])

gulp.task("copy-all", [
  "copy-bootstrap",
  "copy-jquery",  
  "copy-sweetalert2",
  "copy-ng2-toastr",
  "copy-fa-css",
  "copy-fa-fonts",
  "copy-angularfire2",
  "copy-firebase"
])

// gulp.task("build", [
//   "build-resturi-service"
// ])
