var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

// compile javascript
gulp.task('js', function () {
    gulp.src([
            './server/public/js/jquery-2.2.0.min.js',
            './server/public/js/clipboard.min.js',
            './server/public/js/main.js'
        ])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./server/public/dist/'));
});

// compile css
gulp.task('css', function () {
    gulp.src([
            './server/public/css/normalize.css',
            './server/public/css/*.css'
        ])
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./server/public/dist/'));
});

gulp.task('watch', function () {
    gulp.watch('./server/public/js/*', ['js']);
    gulp.watch('./server/public/css/*', ['css']);
});

gulp.task('compile', ['js', 'css']);
gulp.task('default', ['compile', 'watch']);
