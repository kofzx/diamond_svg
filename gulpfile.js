const gulp = require('gulp')
const cleanCss = require('gulp-clean-css')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const webpack = require('webpack-stream')
const config = require('./webpack.config.js')

// less处理
gulp.task('less', function() {
    gulp.src('./src/styles/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./www/css'))
})

// js处理
gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('./www/js'))
})

gulp.task('default', ['less', 'js'])

// watch
gulp.task('watch', function() {
    // 监听less
    gulp.watch('./src/styles/**/*.less', ['less'])
        // 监听js
    gulp.watch('./src/js/**/*.js', function() {
        gulp.run('js')
    })
})