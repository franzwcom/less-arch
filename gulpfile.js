var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
 

var less = require('gulp-less');
var path = require('path');

// var sass        = require('gulp-sass');



 
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
