var gulp            = require('gulp');
var util            = require('gulp-util');
var pleeease        = require('gulp-pleeease');
var plumber         = require('gulp-plumber');
var browserSync     = require('browser-sync');
var spritesmith     = require('gulp.spritesmith');
var sass            = require('gulp-sass');
var pug             = require('gulp-pug');
var uglify          = require('gulp-uglify');
var webpack         = require('webpack-stream');
var stripDebug      = require('gulp-strip-debug');
var ProvidePlugin = require('webpack/lib/ProvidePlugin')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

/*--------------------------------------------------------*/

gulp.task('sass', function () {
  gulp
    .src('./resource/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease({
      autoprefixer: {"browsers": ["last 4 versions", 'ie 10', "Android 4.0"]},
      minifier: util.env.d ? false : false
    }))
    .pipe(gulp.dest('./webroot/css/'));
});

gulp.task('pug', function (){
  gulp.src([
    './resource/pug/**/*.pug',
    '!./resource/pug/en/partial/*.pug',
    '!./resource/pug/jp/partial/*.pug'
    ])
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./webroot/'));
});

gulp.task('watch', function () {
  gulp.watch(['./resource/scss/**/*.scss'], ['sass']);
  gulp.watch(['./resource/pug/**/*.pug'], ['pug']);
});

//gulp webpack --development
gulp.task('webpack', function() {
  gulp.src( [
    './resource/js/**'
  ])
    .pipe(plumber())
    .pipe(webpack({
      cache: true,
      entry: {
        vendor: [
          'babel-polyfill',
          'jquery',
          'velocity-animate',
          'util'
        ],
        index: './resource/js/index.js',
        about: './resource/js/about.js',
        cultureandhistory: './resource/js/cultureandhistory.js',
        opportunities: './resource/js/opportunities.js',
        voices: './resource/js/voices.js',
      },
      output: {
        filename: '[name].bundle.js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015'
        }]
      },
      plugins: function() {
        var option = [
          new ProvidePlugin({
            "$":"jquery",
            "jQuery":"jquery",
            "window.jQuery":"jquery"
          }),
          new CommonsChunkPlugin('vendor', 'vendor.bundle.js')
        ];
        if (!util.env.dev) {
          option.push(new UglifyJsPlugin({
            compress: {
              warnings: false
            }
          }));
        }
        return option;
      }(),
      watch: util.env.w
    }))
    .pipe(util.env.dev ? util.noop() : stripDebug())
    .pipe(gulp.dest('./webroot/js/'));
});

gulp.task('webpack:watch', function() {
  gulp.watch(['./resource/js/**/*.js'], ['webpack']);
});

// DEV SERVER
gulp.task('server', function() {
  browserSync.init({
    port: 3030,
    server: {
      baseDir: "./webroot"
    }
  });
  gulp.watch('./webroot/**/*.html', ['serverReload']);
  gulp.watch('./webroot/**/*.css', ['serverReload']);
  gulp.watch('./webroot/**/*.js', ['serverReload']);
});

gulp.task('serverReload', function() {
  browserSync.reload();
});

gulp.task('build', ['sass', 'pug', 'webpack', 'sprite']);
gulp.task('default', ['watch','sass','server']);
