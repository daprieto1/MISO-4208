var fs = require('fs');
var nrc = require('node-run-cmd');

var Utils = {};

Utils.readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (!err) resolve(data);
            else reject(err);
        });
    });
};

Utils.writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err)
            resolve();
        });
    });
};

Utils.executeCommand = command => {
    var dataCallback = function (data) {
        console.log(data);
    };
    console.log(command);
    nrc.run(command, { onData: dataCallback });
};

module.exports = Utils;