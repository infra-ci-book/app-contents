let gulp = require('gulp');
let pug = require('gulp-pug');

gulp.task('html', () =>
  gulp.src(['src/html/*.pug', '!src/html/_*.pug'])
    .pipe(pug({ verbose: true }))
    .pipe(gulp.dest('./templates'))
);

gulp.task('images', () =>
  gulp.src('src/images/*.png')
    .pipe(gulp.dest('./templates/images'))
);

gulp.task('html:watch', () =>
  gulp.watch([
    'src/html/*.pug',
    'src/images/*.png'
  ], ['html', 'images'])
);