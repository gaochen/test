"use strict";

var gulp = require("gulp");
var webserver = require('gulp-webserver');
var less = require("gulp-less");
var runSequence = require('run-sequence');  // 运行组件，原生为run,多任务并行或顺序
// var rename = require('gulp-rename');  // 重命名
// var clean = require('gulp-clean');  // 清空文件夹
// var cleanCSS = require('gulp-clean-css');  // css压缩
// var uglify = require('gulp-uglify');  // js压缩
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

gulp.task('webserver', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            port: 3000,
            host: 'localhost',
            directoryListing: {
                enable: true,
                path: './src/view/kaimenhong/template/index.html'
            },
            open: true
        }));
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        host: '10.209.8.102',
        livereload: true
    });
})

gulp.task('html', function () { 
    gulp.src('./src/view/kaimenhong/template/*.html')
    .pipe(connect.reload());
});

gulp.task("less", function () {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src('./src/view/kaimenhong/less/**/*.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/view/kaimenhong/css'))
        .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch('./src/view/kaimenhong/less/*.less', ['less']);
    gulp.watch('./src/view/kaimenhong/template/*.html', ['html']);
})

gulp.task('default', ['connect', 'watch']);

