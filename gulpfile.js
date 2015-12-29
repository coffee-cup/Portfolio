var gulp = require('gulp');
var p = require('gulp-load-plugins')();
var PROD = p.util.env.type === 'production';
var rimraf = require('rimraf');
var webpack = require('webpack-stream');
var historyApiFallback = require('connect-history-api-fallback')
var lib = require('bower-files')({
  overrides: {
    "zepto": {
      main: ['./zepto.js']
    }
  }
});

var tasks = ['html', 'css', 'js', 'assets', 'fonts', 'bower-js', 'bower-css', 'bower-fonts'];

// Output file names
// (Remember to change src attributes)
var dest = 'build';
var css_dest = 'styles.css';
var js_dest = 'main.js';
var fonts_dir = 'fonts';
var lib_dest = 'lib';

// Error handler
var onError = function(err) {
  p.util.beep();
  console.log(err);
  this.emit('end');
};

// Copys HTML to dest
gulp.task('html', function() {
  return gulp.src('views/**/*.html')
    .pipe(gulp.dest(dest))
});

// Copy asset dir and copys to dest
gulp.task('assets', function() {
  return gulp.src('assets/**.*')
    .pipe(gulp.dest(dest))
});

// Copy asset dir and copys to dest
gulp.task('fonts', function() {
  return gulp.src(['fonts/**/*.eot', 'fonts/**/*.ttf', 'fonts/**/*.woff', 'fonts/**/*.svg'])
    .pipe(p.flatten())
    .pipe(p.rename({
      dirname: fonts_dir
    }))
    .pipe(gulp.dest(dest))
});

// Lints, Babels, Concats, Minifies,
// gulp.task('js', function() {
//   return gulp.src(['js/**/*.js'])
//     .pipe(p.if(!PROD, p.sourcemaps.init()))
//     .pipe(p.eslint())
//     .pipe(p.babel())
//     .pipe(p.eslint.format())
//     .pipe(p.concat(js_dest))
//     .pipe(p.if(!PROD, p.beautify(), p.uglify()))
//     .pipe(p.if(!PROD, p.sourcemaps.write()))
//     .pipe(gulp.dest(dest));
// });

gulp.task('lint', function() {
  return gulp.src('js/**/*.js')
    .pipe(p.eslint())
    .pipe(p.babel())
    .pipe(p.eslint.format())
    .pipe(p.eslint.failOnError());
});

// TODO : SOURCEMAPS FOR WEBPACK
// TODO : PRODUCTION ON --type production

// Complile SCSS into css and copys to dest
gulp.task('css', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(p.if(!PROD, p.sourcemaps.init()))
    .pipe(p.sass().on('error', p.sass.logError))
    .pipe(p.autoprefixer())
    .pipe(p.concat(css_dest))
    .pipe(p.if(PROD, p.minifyCss()))
    .pipe(p.if(!PROD, p.sourcemaps.write()))
    .pipe(gulp.dest(dest))
});

gulp.task('js', function() {
  gulp.src(['js/**/*.js', 'views/**/*.vue'])
    .pipe(p.if(!PROD, p.sourcemaps.init()))
    .pipe(p.plumber({
      errorHandler: onError
    }))
    .pipe(webpack({
      // devtool: !PROD ? '#source-map' : undefined,
      module: {
        preLoaders: [{
          test: /\.js$/,
          loader: "eslint-loader",
          exclude: /node_modules|lib/
        }],
        loaders: [{
          test: /\.vue$/,
          loader: 'vue'
        }, {
          test: /\.js$/,
          exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
          loader: 'babel'
        }]
      }
    }))
    .pipe(p.concat(js_dest))
    .pipe(p.if(!PROD, p.beautify()))
    .pipe(p.if(PROD, p.uglify()))
    .pipe(p.if(!PROD, p.sourcemaps.write()))
    .pipe(gulp.dest(dest))
});

// Places all bower main files into lib_dest in dest
gulp.task('bower-js', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(p.if(!PROD, p.sourcemaps.init()))
    .pipe(p.concat(lib_dest + '.js'))
    .pipe(p.uglify())
    .pipe(p.if(!PROD, p.sourcemaps.write()))
    .pipe(gulp.dest(dest));
});

gulp.task('bower-css', function() {
  return gulp.src(lib.ext('css').files)
    .pipe(p.if(!PROD, p.sourcemaps.init()))
    .pipe(p.concat('lib.css'))
    .pipe(p.minifyCss())
    .pipe(p.if(!PROD, p.sourcemaps.write()))
    .pipe(gulp.dest(dest));
});

gulp.task('bower-fonts', function() {
  return gulp.src(lib.ext(['eot', 'woff', 'ttf', 'svg']).files)
    .pipe(p.rename({
      dirname: fonts_dir
    }))
    .pipe(gulp.dest(dest));
});

// Clean build directory (wipe everything)
gulp.task('clean', function() {
  rimraf(dest, function() {});
});

gulp.task('default', tasks);

gulp.task('watch', function() {
  gulp.watch(['js/**/*.*', 'views/**/*.vue'], ['js']);
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('assets/**/*.*', ['assets']);
  gulp.watch('views/**/*.html', ['html']);
  gulp.watch('fonts/**/*.*', ['fonts']);
  gulp.watch('bower_components/**/*.*', ['bower-js', 'bower-css', 'bower-fonts']);
});

gulp.task('listen', ['default', 'watch', 'webserver']);

// Simple webserver with live reload that serves dest dir
gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(p.webserver({
      middleware: [historyApiFallback()],
      livereload: true,
      directoryListing: false,
      open: false,
      host: '0.0.0.0',
      port: 8000
    }));
});
