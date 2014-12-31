'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
//
//var jsFilter = plugins.filter(['*.js']);
//var cssFilter = plugins.filter(['*.css']);
//var jsToMinifyFilter = plugins.filter(['*.js', '!*.min.js']);

var onError = function (error) {
    plugins.util.log(error);
    this.emit('end');
}

gulp.task('bower-js', function () {

    return gulp.src([
        'vendor/jquery/dist/jquery.min.js',
        'vendor/lodash/dist/lodash.compat.min.js'
    ])
        .pipe(plugins.concat('vendor.min.js'))
        //.pipe(plugins.uglify()).on('error', onError)
        .pipe(gulp.dest('assets/js'))
});

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(plugins.less()).on('error', onError)
        .pipe(plugins.csso())
        .pipe(plugins.rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('jsmin', function () {
    return gulp.src([
        'src/js/base.js',
        'src/js/grid.js',
        'src/js/preview.js',
        'src/js/pathFinder.js',
        'src/js/square.js',
        'src/js/line.js',
        'src/js/ball.js',
        'src/js/score.js',
        'src/js/animation.js',
        'src/js/init.js',
    ])
        .pipe(plugins.concat('app.min.js'))
        //.pipe(plugins.uglify()).on('error', onError)
        .pipe(gulp.dest('assets/js'))
});

gulp.task('watch', function () {
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/js/*.js', ['jsmin']);
    gulp.watch('bower/**/*', ['bower-js']);
});

gulp.task('serve', function () {
    plugins.connect.server({
        'root': './'
    });
});

gulp.task('server', ['serve', 'watch']);

gulp.task('deploy', function () {
    var fs = require('fs')
    var config = JSON.parse(fs.readFileSync('./deploy.json'));

    gulp.src([
        '**/*',
        '!{node_modules,node_modules/**}',
        '!{less,less/**}',
        '!{vendor,vendor/**}',
        '!{bower,package}.json',
        '!deploy.{json,json.skel}',
        '!gulpfile.js',
        '!README.md',
        '!.*'
    ])
        .pipe(plugins.cloudfiles(config, {'read': false}));
});

gulp.task('default', ['bower-js', 'less', 'jsmin']);