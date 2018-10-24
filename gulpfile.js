const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const hash = require('gulp-hash');

gulp.task('css', function () {
    gulp.src('src/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    gulp.src(['src/*.js'])
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['css', 'scripts']);