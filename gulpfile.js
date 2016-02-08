'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')
var compass = require('compass-importer')


gulp.task('sass', function()
{
    return gulp.src('sass/**/*.scss')
      .pipe(sass({ importer: compass }).on('error', sass.logError))
      .pipe(gulp.dest('./css')); // .pipe(sass({outputStyle: 'compressed'}))

});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});