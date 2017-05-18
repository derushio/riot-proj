#! /bin/bash

find ./dist/script/tag/* -type f -name "*.js" -print | xargs -I{} browserify -o ./dist/script/tag/tag.js -t [ babelify --presets [ es2015 es2016 ] ] {}
find ./dist/script/entry/* -type f -name "*.js" -print | xargs -I{} browserify -o {} -t [ babelify --presets [ es2015 es2016 ] ] {}
find ./dist/script/* \( -name lib -o -name entry -o -name tag.js \) -prune -o -type f -print | xargs rm -f
find ./dist/script/* \( -name lib -o -name entry -o -name tag \) -prune -o -type d -print | xargs rm -rf