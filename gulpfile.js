var gulp = require('gulp');
var runSequence= require("run-sequence");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var pump = require('pump');
var minifyHTML = require('html-minifier').minify;
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');

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

gulp.task('compressJS', function(cb) {
	pump([
		gulp.src('app/js/*.js'),
		uglify(),
		gulp.dest('build/js')
	],
	cb);
});

gulp.task('compressHTML', function(cb) {
	pump([
		gulp.src('*.html'),
		minifyHTML(),
		gulp.dest('build')
	],
	cb);
});

gulp.task('compressCSS', function(cb) {
	var cssPlugins = [
		autoprefixer({browsers: ['last 1 version']}),
		cssnano()
	];
	return gulp.src('app/css/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('build/css'));
});
