var gulp = require('gulp');
var pump = require('pump');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('demo', ['default'], function (cb) {
	pump([
		gulp.src('./dist/angular-text-image.min.js'),
		gulp.dest('./demo')
	],cb)
});
gulp.task('default', function (cb) {
	pump([
		gulp.src('./src/angular-text-image.js'),
		//$.uglify(),
		$.ngAnnotate({ add: true }),
		$.rename({ suffix: '.min' }),
		gulp.dest('./dist')
	], cb);
});
