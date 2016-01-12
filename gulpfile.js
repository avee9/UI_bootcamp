var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    postcss = require('es6-promise').polyfill(); // for promise error in node_modules/gulp-autoprefixer/node_modules/postcss/lib/lazy-result.js 

gulp.task('clean', function (cb) {
    return del([
        './public/**/*'
    ]);
});

gulp.task('css', function () {
    gulp.src('src/assets/stylesheets/*.scss')
        .pipe(plumber(''))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('src/jade/*.jade')
        .pipe(plumber(''))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(connect.reload());
});


gulp.task('images', function() {
    gulp.src(['src/assets/images/*'])
        .pipe(plumber(''))
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/assets/stylesheets/**/*', ['css']);
  gulp.watch('src/assets/images/*', ['images']);
  gulp.watch('src/**/*.jade', ['html']);
  watch('./public/**/*').pipe(connect.reload());
});

gulp.task('serve', ['build'], function() {
  connect.server({
    root: 'public',
    livereload: true,
    port: 3100
  });
});

gulp.task('deploy', function () {
    gulp.src(['./public/**/*', './public/*'])
       .pipe(gulp.dest('./'));
});

gulp.task('build', ['clean', 'html', 'css', 'images']);

gulp.task('default', ['serve', 'watch']);
