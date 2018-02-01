var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

// 引入文件的处理
gulp.task('import', function() {
	gulp.src('WebContent/html5_blue/js/*.js')
	.pipe(concat('lib.js'))
	.pipe(uglify({
		mangle: {toplevel: true} 
	}))
	.pipe(gulp.dest('WebContent/dist/js'));
});

// 编写文件的处理
gulp.task('system', function() {
	gulp.src('WebContent/scripts/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify({
		mangle: {toplevel: true} 
	}))
	.pipe(gulp.dest('WebContent/dist/js'));
});

// 处理css文件
gulp.task('uglifyCSS', function(){
	gulp.src('WebContent/html5_blue/css/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('WebContent/dist/css/'))
});

gulp.task('default', ['system', 'uglifyCSS']);