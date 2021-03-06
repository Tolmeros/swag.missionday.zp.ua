const gulp = require('gulp');
const watch = require('gulp-watch');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const webpackConfig = require('./webpack.config');
const webpackStream = require('webpack-stream');
const notify = require('gulp-notify');

gulp.task('build:css', function () {
    gulp.src('./resources/assets/scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(notify({message: 'Built CSS', onLast: true}))
});

gulp.task('build:fonts', function () {
    gulp.src('./resources/assets/fonts/**')
        .pipe(gulp.dest('./public/fonts'));
});

gulp.task('build:js', function () {
    gulp.src('./resources/assets/js/*.js')
        .pipe(webpackStream(webpackConfig))
        .on('error', function handleError() {
            this.emit('end'); // Recover from errors
        })
        .pipe(gulp.dest('./public/js'))
        .pipe(notify({message: 'Built JS', onLast: true}))
});

gulp.task('build:img', function () {
    gulp.src('./resources/assets/img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./public/img'))
});

gulp.task('build', ['build:js', 'build:css', 'build:img', 'build:fonts']);

gulp.task('watch', function () {
    watch(['./resources/assets/js/**/*'], function () {
        gulp.run('build:js');
    });

    watch(['./resources/assets/scss/**/*'], function () {
        gulp.run('build:css');
    });

    watch(['./resources/assets/img/**/*'], function () {
        gulp.run('build:img');
    });
});

gulp.task('default', ['build']);
