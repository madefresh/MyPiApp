/// <binding ProjectOpened='watch' />
var cssFiles = ["Content/sass/*.scss"];
var cssMinDir = "Content/minified_css/";
var cssMinFile = "site.min.css";

var gulp = require('gulp');

var concat = require('gulp-concat');

// css
var minifyCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');


gulp.task('css', function () {

    gulp.src(cssFiles)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(gcmq())
        .pipe(minifyCss())
        .pipe(concat(cssMinFile))
        .pipe(gulp.dest(cssMinDir));
});

gulp.task('watch', function () {
    gulp.watch(cssFiles, ['css']);
});