var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default',function(){
	gulp.src(['./src/js/jquery.ss-imgbox.js'])
		.pipe(uglify())
		.pipe(rename('jquery.ss-imgbox.min.js'))
		.pipe(gulp.dest('./dist/js'));
});
