var gulp = require('gulp');
var watch = require('gulp-watch');

// JS tools
var uglify = require('gulp-uglify');

// CSS tools
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('default', function() {
    console.log('Select a task, yo');
});

gulp.task('sass', function() {
    gulp.src('assets/scss/*.scss')
        .pipe(sass({
            style: 'expanded',
            sourceComments: 'map'
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('compress', function() {
    gulp.src('assets/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));

    //gulp.src('assets/js/**/*.js')
    //    .pipe(uglify())
    //    .pipe(gulp.dest('assets/dist'));
});

gulp.task('watch', function() {
    watch('assets/scss/**/*.scss', function(files, cb) {
        gulp.start('sass', cb)
    });
})