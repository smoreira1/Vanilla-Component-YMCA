const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const hash = require('gulp-hash');
const clean = require('gulp-clean');


gulp.task('delete-dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('css', function () {
    gulp.src('src/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('demo'))
        .pipe(hash())
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
        .pipe(gulp.dest('demo'))
        .pipe(hash()) 
        .pipe(gulp.dest('dist'));
});



gulp.task('default', ['delete-dist', 'css', 'scripts']);