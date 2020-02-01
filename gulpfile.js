let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    uglifyes = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', async function(){
  del.sync('dist')
})

gulp.task('scss', async function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsersList: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/animate.css/animate.css',
    'bootstrap/css/bootstrap.css',
    'bootstrap/css/bootstrap-grid.css',
    'bootstrap/css/bootstrap-reboot.css'
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', async function() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'bootstrap/js/bootstrap.bundle.js',
    'bootstrap/js/bootstrap.js',
    'node_modules/wow.js/dist/wow.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('babel', async function () {
  return gulp.src('app/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglifyes())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
})

gulp.task('minimg', function () {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg|ico)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', async function () {
  browserSync.init({
      server: {
          baseDir: "app/",
          directory: true
      }
  });
});


gulp.task('export', async function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', async function() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export', 'minimg', 'babel'))
gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'browser-sync', 'watch'));