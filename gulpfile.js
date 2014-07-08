var jade = require('gulp-jade');
var changed = require('gulp-changed')('./dist/');
var gulp = require('gulp');
var sequence = require('run-sequence');
var rework = require('gulp-rework');

gulp.task('jade', function(){
  gulp.src('./public/pages/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function(){
  gulp.src('./public/images/**/*.png')
  .pipe(gulp.dest('./dist/images/'));
  gulp.src('./public/images/**/*.jpg')
  .pipe(gulp.dest('./dist/images/'));
});

gulp.task('css', function(){
  var dest = './dist/stylesheets/';
  gulp.src('./public/stylesheets/pages/**/*.css')
  .pipe(rework(
    require('rework-import')({
      path: [
        './public/stylesheets/pages/'
      ]
    })
  ))
  .pipe(require('gulp-csso')())
  .pipe(gulp.dest(dest));
});

gulp.task('default', function(){
  sequence(['jade', 'images', 'css']);
});
