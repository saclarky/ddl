var gulp = require('gulp');
var runSequence= require("run-sequence");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task("default", ['watch']);

gulp.task("scss", function() {
	sass("app/scss/*.scss")
	.pipe(autoprefixer({ browsers: ['IE 6','Chrome 9', 'Firefox 14']}))
	.pipe(gulp.dest("app/css"));
});

gulp.task("js-hint", function() {
	return gulp.src("app/js/**/*.js")
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
	gulp.watch("app/js/**/*.js", ['js-hint']);
	gulp.watch("app/scss/**/*.scss", ['scss']);
});
