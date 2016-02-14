var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

// compile javascript
gulp.task('js', function () {
    gulp.src([
            './public/js/jquery-2.2.0.min.js',
            './public/js/clipboard.min.js',
            './public/js/main.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/dist/'));
});

// compile css
gulp.task('css', function () {
    gulp.src([
            './public/css/normalize.css',
            './public/css/*.css'
        ])
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./public/js/*', ['js']);
    gulp.watch('./public/css/*', ['css']);
});

gulp.task('compile', ['js', 'css']);
gulp.task('default', ['compile', 'watch']);
