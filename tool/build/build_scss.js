var fs = require('fs');
var sass = require('node-sass');
var child_process = require('child_process');
var exec = (command) => {
    return new Promise((resolve, reject) => {
        child_process.exec(command, () => {
            resolve();
        });
    });
};

function copycss(path, file) {
    return new Promise((resolve, reject) => {
        var distpath = './dist/' + path.replace('./src/', '');
        exec('mkdir -p ' + distpath).then(() => {
            return exec('cp ' + path + file + ' ' + distpath + file);
        }).then(() => {
            resolve();
        })
    });
}

function makecss(path, file) {
    return new Promise((resolve, reject) => {
        var filename = file.replace('.scss', '');
        var filepath = path + file;

        var code = fs.readFileSync(filepath, 'utf-8');
        var result = sass.renderSync({
            data: code
        });

        exec('mkdir -p ' + './dist/' + path.replace('./src/', '')).then(() => {
            fs.writeFile('./dist/style/' + filename + '.css', result.css.toString(), () => {
                resolve();
            });
        });
    });
}

function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) throw err;

            var pq = [];

            files.filter((file) => {
                return fs.statSync(path + file).isFile() && /.*\.css$/.test(file);
            }).forEach((file) => {
                pq.push(copycss(path, file));
            });

            files.filter((file) => {
                if (fs.statSync(path + file).isDirectory()) pq.push(readdir(path + file + "/"));
                return fs.statSync(path + file).isFile() && /.*\.scss$/.test(file);
            }).forEach((file) => {
                pq.push(makecss(path, file));
            });

            Promise.all(pq).then(() => { resolve(); });
        });
    });
}

var path = './src/style/';
exec('mkdir -p ./dist/style/').then(() => {
    return readdir(path);
});