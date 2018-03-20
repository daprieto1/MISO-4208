var fs = require('fs');
var nrc = require('node-run-cmd');

var UtilsService = {};

UtilsService.removeFile = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) resolve(err);
            resolve();
        });
    });
}

UtilsService.cleanFolder = path => {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) resolve(err);
            resolve();
        });
    });
}

UtilsService.readFile = (path) => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService readFile start: path = ${path}`);
        fs.readFile(path, 'utf-8', (err, data) => {
            if (!err) resolve(data);
            else reject(err);
        });
    });
};

UtilsService.writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err)
            resolve();
        });
    });
};

UtilsService.executeCommand = command => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService executeCommand start: command = ${command}`);
        nrc.run(command)
            .then(function (exitCodes) {
                console.log(`UtilsService executeCommand ends: exitCodes = ${exitCodes}`);
                resolve();
            }, function (err) {
                console.log(`UtilsService executeCommand ends: error = ${err}`);
                reject(err);
            });
    });
};

module.exports = UtilsService;