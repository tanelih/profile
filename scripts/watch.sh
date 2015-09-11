NODE_ENV='development' \
	budo src/scripts/app.js:dist/app.js \
			--live --pushstate -- -d -v -t babelify -t envify \
		| garnish
