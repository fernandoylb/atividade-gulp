const { src, dest, watch, parallel } = require('gulp');

// SASS
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

// JS
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Imagens
const imagemin = require('gulp-imagemin');

// Caminhos
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  }
};

// 🔹 Compilar SASS
function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest));
}

// 🔹 Minificar JavaScript
function scripts() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest));
}

// 🔹 Otimizar imagens
function images() {
  return src(paths.images.src)
    .pipe(imagemin())
    .pipe(dest(paths.images.dest));
}

// 🔹 Watch
function watchFiles() {
  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
}

exports.default = parallel(styles, scripts, images);
exports.watch = watchFiles;
