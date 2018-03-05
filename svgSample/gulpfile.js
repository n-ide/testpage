var gulp            = require('gulp');
 var util            = require('gulp-util');
 var pleeease        = require('gulp-pleeease');
var plumber         = require('gulp-plumber');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var pug             = require('gulp-pug');


/*--------------------------------------------------------*/

gulp.task('sass', function () {
   gulp.src([
     './resource/scss/**/*.scss',
     '!./resource/scss/partial/*.scss'
     ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 10', "Android 4"]},
      minifier: util.env.d ? true : false
    }))
    .pipe(gulp.dest('./webroot/css/'));
});

gulp.task('pug', function (){
   gulp.src([
     './resource/pug/**/*.pug',
     '!./resource/pug/partial/*.pug'
     ])
     .pipe(pug({pretty: util.env.d ? true : true}))
     .pipe(gulp.dest('./webroot/'));
});

gulp.task('watch', function () {
  gulp.watch(['./resource/scss/**/*.scss'], ['sass']);
  gulp.watch(['./resource/pug/**/*.pug'], ['pug']);
});


// DEV SERVER
gulp.task('server', function() {

  browserSync.init({
    server: "./webroot"
  });

  gulp.watch('./webroot/**/*.html', ['serverReload']);
  gulp.watch('./webroot/**/*.css', ['serverReload']);
  gulp.watch('./webroot/**/*.js', ['serverReload']);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('default', ['watch', 'server']);

