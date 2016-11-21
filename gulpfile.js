'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

const server = require('./test/testServer');

const startServer = done => {
    server.wait(() => done());
};

// create server as a dependency of test
gulp.task('test:server', done => startServer(done));

gulp.task('test', ['test:server'], () => gulp.src('./test/**/*.js')
  .pipe(mocha({ reporter: 'spec' }))
  // ensure server is killed
  .on('end', () => process.exit()));