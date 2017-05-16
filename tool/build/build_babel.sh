#! /bin/bash

find ./dist/script/* \( -name lib -o -name entry \) -prune -o -type f -name "*.js" -print | xargs browserify -o dist/script/bundle.js -t [ babelify --presets [ es2015 ] ]
find ./dist/script/* \( -name lib -o -name entry -o -name bundle.js \) -prune -o -type f -print | xargs rm -f
find ./dist/script/* \( -name lib -o -name entry -o -name bundle.js \) -prune -o -type d -print | xargs rm -rf