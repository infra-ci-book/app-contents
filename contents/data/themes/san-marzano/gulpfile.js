let gulp = require('gulp');

require('./gulp/css')
require('./gulp/html')

gulp.task('default', ['html', 'css', 'images'])