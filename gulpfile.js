var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('styles', function() {
	gulp.src(['src/scss/source.scss'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(rename('main.css'))
		.pipe(gulp.dest('dist/css/'))
});

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
});

gulp.task('default', function() {
	gulp.watch("src/scss/**/*.scss", ['styles']);
	gulp.watch("src/js/**/*.js", ['scripts']);
});
