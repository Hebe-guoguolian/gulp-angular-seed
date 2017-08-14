
var gulp  = require('gulp');
var jsint = require('gulp-jshint');
var jsmin = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('open');

var plugins = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
];

//检查脚本
gulp.task('lint', function() {
    gulp.src('./app/js/**/*.js')
        .pipe(jsint())
        .pipe(jsint.reporter('default'))
        .pipe(connect.reload());
})


//合并、压缩js文件
gulp.task('scripts', function() {
    gulp.src('./app/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload());
});
//合并、压缩来自npm的js资源文件
gulp.task('npmscripts', function() {
    return gulp.src(plugins)
        .pipe(concat('npm.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('npm.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
})

//合并、压缩css文件
gulp.task('css', function() {
  gulp.src('./app/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename('style.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
});

//移动html
gulp.task('html',function(){
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
})

gulp.task('build',['lint','scripts','npmscripts','css','html']);

gulp.task('server',['build'],function(){
    /*设置服务器*/
    connect.server({
        root:['./dist'],
        livereload:true,
        port:3032
    });
    gulp.watch('./app/**/*.html',['html']);
    gulp.watch('./app/css/**/*.css',['css']);
    gulp.watch('./app/js/**/*.js',['scripts']);

    open('http://localhost:3032');

});

gulp.task('default',['server']);




