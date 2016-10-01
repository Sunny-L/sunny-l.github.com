var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default',function(){
	gulp.src(['./js/jquery.stickem.js'])
		.pipe(uglify())
		.pipe(rename('jquery.stickem.min.js'))
		.pipe(gulp.dest('./dist/js'));
});