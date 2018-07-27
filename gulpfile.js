"use strict";

var gulp = require("gulp");
// var less = require("gulp-less");
// var runSequence = require('run-sequence');  // 运行组件，原生为run,多任务并行或顺序
// var rename = require('gulp-rename');  // 重命名
// var clean = require('gulp-clean');  // 清空文件夹
// var cssmin = require('gulp-clean-css');  // css压缩
// var uglify = require('gulp-uglify');  // js压缩
// var notify = require('gulp-notify');
// var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
// var postcss = require('gulp-postcss');
// var px2rem = require('postcss-px2rem');
// var autoprefixer = require('gulp-autoprefixer'); // 自动添加前缀
// var babel = require('gulp-babel');
// var imagemin = require('gulp-imagemin');    // 图片无损压缩
// var pngquant = require('imagemin-pngquant');    // png压缩

//定义路径
var paths = {
    js: ['./src/view/kaimenhong/js/**'],
    css: ['./src/view/kaimenhong/css/*'],
    img: ['./src/view/kaimenhong/img/*'],
    template: ['./src/view/kaimenhong/template/**'],
};


gulp.task('connect', function () {
    connect.server({
        root: './',
        host: '127.0.0.1', // 10.209.8.102  192.168.2.105
        port: 9080,
        livereload: true
    });
})

gulp.task('html', function () {
    gulp.src('./template/*.html')
        .pipe(connect.reload());
});

gulp.task("less", function () {
    var processors = [px2rem({ remUnit: 75 })];
    return gulp.src('./src/view/kaimenhong/less/**/*.less')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/view/kaimenhong/css'))
        .pipe(connect.reload());
})

gulp.task('js', function () {
    gulp.src('./src/view/kaimenhong/js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    // gulp.watch('./src/view/kaimenhong/less/*.less', ['less']);
    gulp.watch('./template/*.html', ['html']);
    // gulp.watch('./src/view/kaimenhong/js/*.js', ['js']);
})

// 开发
gulp.task('dev', ['connect', 'watch']);


// clean
gulp.task('clean', function () {
    return gulp.src(['./dist/'], { read: false })
        .pipe(clean({ force: true }));
});

// move
gulp.task('move', function () {
    gulp.src(paths.css)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('./dist/css/'));
    gulp.src(paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],  //不要移除svg的viewbox属性
            use: [pngquant()]   //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./dist/img/'));
    gulp.src(paths.template)
        .pipe(gulp.dest('./dist/template/'));
    return gulp.src(paths.js)   // return文件给后面压缩js文件使用
        .pipe(gulp.dest('./dist/js/'));
})

gulp.task('uglify', function () {
    gulp.src(['dist/js/**/*.js', '!dist/js/zepto.min.js'])
        .pipe(babel())      // 编译
        .pipe(uglify())     // 压缩
        .pipe(gulp.dest('./dist/js/'));
})

// 打包发布
gulp.task('build', ['clean'], function () {
    runSequence('move', 'uglify')
})