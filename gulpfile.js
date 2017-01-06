/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-jshint gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const livereload = require('gulp-livereload');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

// Styles
gulp.task('styles', function() {
  return gulp.src('public/stylesheets/main.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/stylesheets'))
    .pipe(notify({ message: 'Styles task complete', onLast: true }));
});

// Scripts
gulp.task('scripts', function() {

  var b = browserify({
    entries: './public/javascripts/main.js',
    debug: !gulp.env.production,
    // transform: [reactify]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/javascripts'))
    .pipe(notify({ message: 'Scripts task complete', onLast: true }));
});

// Images
gulp.task('images', function() {
  return gulp.src('public/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete', onLast: true }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/styles', 'dist/scripts', 'dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', ['default'], function() {
  // Watch .scss files
  gulp.watch('public/stylesheets/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('public/javascripts/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('public/images/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
