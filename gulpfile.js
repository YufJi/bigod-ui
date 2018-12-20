const path = require('path');
const gulp = require('gulp');
const shelljs = require('shelljs');
const merge2 = require('merge2');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const fs = require('fs-extra');
const minify = require('gulp-babel-minify');
const through2 = require('through2');
const argv = require('minimist')(process.argv.slice(2));

const src = argv.src || 'src';

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

function cleanCompile() {
  if (fs.existsSync(resolveCwd('lib'))) {
    shelljs.rm('-rf', resolveCwd('lib'));
  }
}

gulp.task('cleanCompile', cleanCompile)

gulp.task('js', ['cleanCompile'], () => {
  return gulp
    .src(`${src}/**/*.js`)
    .pipe(babel({
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          "@babel/plugin-proposal-export-default-from",
          ["@babel/plugin-proposal-class-properties", { loose: true }]
        ]
    }))
    .pipe(gulp.dest('lib'))
});

gulp.task('css', ['cleanCompile'], () => {
  const less = require('gulp-less');
  return merge2(
    gulp.src(`${src}/**/*.less`).pipe(less()).pipe(postcss([require('./getAutoprefixer')()])),
    gulp.src(`${src}/**/*.less`),
    gulp.src(`${src}/**/package.json`)
  ).pipe(gulp.dest('lib'))
});


gulp.task('compile', ['js', 'css']);

