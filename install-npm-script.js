let fs = require('fs');

var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

json["build"] = "node tool/build/build.js";
json["build-babel"] = "tool/build/build_babel.sh";

fs.writeFileSync("./package.json", JSON.stringify(json, null, 4));