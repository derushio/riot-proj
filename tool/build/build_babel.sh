#! /bin/bash

entryDirs=(`find ./src/script/entry/ -type d -name "*" -print`)
for entryDir in ${entryDirs[@]}; do
    entryDirPath=`echo $entryDir | cut -c "7-${#entryDir}"`
    mkdir -p "./dist/$entryDirPath"
done

entrys=(`find ./src/script/entry/* -type f -name "*.js" -print`)
for entry in ${entrys[@]}; do
    entryPath=`echo $entry | cut -c "7-${#entry}"`
    browserify -o "./dist/$entryPath" -t [ babelify --presets [ es2015 es2016 ] ] $entry
done