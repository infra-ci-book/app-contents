let gulp = require('gulp');
let gutil = require('gulp-util');

let cleanCSS = require('gulp-clean-css');
let del = require('del');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');

let production = gutil.env.production

gulp.task('css:clean', () => del(['assets/css/*']));

gulp.task('css:sass', () => {
  if (production) {
    return gulp.src('./src/css/app.sass')
      .pipe(sass({ includePaths: ['./bower_components'] })
        .on('error', sass.logError))
      .pipe(cleanCSS({ debug: true }, function (details) {
        let percent = details.stats.minifiedSize / details.stats.originalSize
        gutil.log(`${details.name} compressed: ${(percent * 100).toFixed(2)}%`)
      }))
      .pipe(gulp.dest('./assets/css'))
  }

  return gulp.src('./src/css/app.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['./bower_components'] })
        .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
});

gulp.task('css', ['css:clean', 'css:sass'])

gulp.task('css:watch', () =>
  gulp.watch([
    './src/css/*.sass',
    './src/css/**/*.sass'
  ], ['css'])
);
