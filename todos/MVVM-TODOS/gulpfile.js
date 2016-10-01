var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('less',function(){
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/css'))
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
})
gulp.task('cleanjs',function(){
    return gulp.src(['public/build/js/*.js'],{read:false})
        .pipe(rimraf({ force: true }));
});
gulp.task('buildjs',['cleanjs'],function(cb){
    return gulp.src(['public/js/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('public/build/js'))
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(gulp.dest('public/build/js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/build/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/rev/js'));
});
gulp.task('serve',['less'],function(){
    browserSync.init({
        server: "./public"
    });
    gulp.watch('public/less/*.less',['less']);
    gulp.watch('public/*/*.*').on('change',browserSync.reload);
    gulp.watch('public/*.*').on('change',browserSync.reload);
})

gulp.task('watch',function(){
    gulp.watch('public/less/*.less',['less']);
})
