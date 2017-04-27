#! /bin/bash

find ./dist/script/tag -type f -name *.js -print | xargs browserify -o dist/script/bundle.js -t [ babelify --presets [ es2015 ] ]