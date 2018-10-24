var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
const minify = require('gulp-minify');

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
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['css', 'scripts']);