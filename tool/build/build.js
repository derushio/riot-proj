var fs = require('fs');
var riot = require('riot');
var sass = require('node-sass');
var child_process = require('child_process');
var exec = (command) => {
    return new Promise((resolve, reject) => {
        child_process.exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                var e = { error: error, stderr: stderr }
                reject(e);
            }
            resolve(stdout);
        });
    });
};

// scssの割り込みコンパイル
riot.parsers.css.scss = (tagName, css) => {
    var result = sass.renderSync({
        data: css
    });
    return result.css.toString();
};

// tagファイルをコンパイル
function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) throw err;

            var pq = [];

            files.filter((file) => {
                if (fs.statSync(path + file).isDirectory()) pq.push(readdir(path + file + "/"));
                return fs.statSync(path + file).isFile() && /.*\.tag$/.test(file);
            }).forEach((file) => {
                pq.push(new Promise((resolve, reject) => {
                    var filename = file.replace('.tag', '');
                    var filepath = path + file;

                    var code = fs.readFileSync(filepath, 'utf-8');
                    var js = riot.compile(code);

                    exec('mkdir -p ' + './dist/script/' + path.replace('./src/', '')).then(() => {
                        fs.writeFile('./dist/script/' + path.replace('./src/', '') + filename + '.js', js, () => {
                            resolve();
                        });
                    });
                }));
            });

            Promise.all(pq).then(() => { resolve(); });
        });
    });
}

var path = './src/tag/';

exec('rm -rf ./dist/').then(() => {
    return exec('mkdir -p ./dist/script/lib/riot/');
}).then(() => {
    return exec('cp ./node_modules/riot/riot.min.js ./dist/script/lib/riot/riot.min.js');
}).then(() => {
    return exec('mkdir -p ./dist/script/lib/jquery/');
}).then(() => {
    return exec('cp ./node_modules/jquery/dist/jquery.min.js ./dist/script/lib/jquery/jquery.min.js');
}).then(() => {
    return exec('mkdir -p ./dist/script/lib/');
}).then(() => {
    return exec('cp -R ./src/script/lib/* ./dist/script/lib/');
}).then(() => {
    return exec('rsync -a ./src/ ./dist/ --exclude "/tag/" --exclude "/style/"');
}).then(() => {
    return exec('mkdir -p ./dist/script/tag/');
}).then(() => {
    return readdir(path);
}).then(() => {
    console.log('riot build done.');
}).then(() => {
    return exec('npm run build-babel');
}).then(() => {
    console.log('babel build done.');
}).then(() => {
    return exec('node ./tool/build/build_scss.js');
}).then(() => {
    console.log('scss build done.');
}).then(() => {
    console.log('project build done.');
}).catch((e) => {
    console.log(e.stderr);
});