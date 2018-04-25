var gulp = require('gulp');
var runSequence= require("run-sequence");
var sass = require('gulp-ruby-sass');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');

gulp.task("default", ['watch']);

gulp.task("scss", function() {
	sass("app/scss/*.scss")
	// .pipe(autoprefixer({ browsers: ['IE 6','Chrome 9', 'Firefox 14']}))
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

gulp.task('compressHTML', function() {
	return gulp.src('app/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('compressCSS', function(cb) {
	var cssPlugins = [
		autoprefixer({browsers: ['cover 99.5% in US']}),
		cssnano()
	];
	return gulp.src('app/css/*.css')
		.pipe(postcss(cssPlugins))
		.pipe(gulp.dest('build/css'));
});

gulp.task('compressIMG', function() {
	return gulp.src('app/images/*.jpg')
	.pipe(imagemin())
	.pipe(gulp.dest('build/images'));
});

gulp.task('build', function() {
	runSequence('scss',
		['compressCSS', 'compressJS', 'compressHTML', 'compressIMG']
	);
});
