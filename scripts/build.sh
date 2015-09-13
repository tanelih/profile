NODE_ENV='production' \
  browserify src/scripts/app.js -t babelify -t envify -d -v -o dist/app.js