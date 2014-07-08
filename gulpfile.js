var jade = require('gulp-jade');
var changed = require('gulp-changed')('./dist/');
var gulp = require('gulp');
var sequence = require('run-sequence');

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

  [
    './public/stylesheets/**/*',
    './public/lib/pure/base.css'
  ].forEach(function(glob){
    gulp.src(glob)
    .pipe(gulp.dest(dest));
  });
});

gulp.task('default', function(){
  sequence(['jade', 'images', 'css']);
});
