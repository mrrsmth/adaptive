"use strict";

let gulp = require('gulp');
let less = require('gulp-less');
let plumber = require('gulp-plumber');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let server = require('browser-sync').create();


gulp.task('style', function(done) {
	gulp.src('less/style.less')
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([
		autoprefixer()
	]))
	.pipe(gulp.dest('css'))
	.pipe(server.stream());
	
	done();
});

gulp.task('serve', function(done) {
	server.init({
		server: '.',
		notify: false,
		open: true,
		cors: true,
		ui:false
	});
	
	gulp.watch('less/**/*.less', gulp.series('style'));
	gulp.watch('*.html').on('change', () => {
		server.reload();
		done();
	});
	
	done();
});

gulp.task('default', gulp.series('style', 'serve'));