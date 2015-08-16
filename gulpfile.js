var gulp = require('gulp'),
	minify = require('gulp-minify'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	gulp.src('app/*.js')
	.pipe(uglify())
	.pipe(concat('initial.min.js'))
	.pipe(gulp.dest('js/'));

	gulp.src('app/*/*/*.js')
	.pipe(uglify())
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
  gulp.watch('app/*.js', ['default']);
  gulp.watch('app/*/*/*.js', ['default']);
});