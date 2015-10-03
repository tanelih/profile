NODE_ENV='production' \
  browserify src/scripts/app.js -t babelify -t envify -d -v -o dist/app.js

postcss --use autoprefixer src/styles/app.css --dir dist
