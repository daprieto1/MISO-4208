var fs = require('fs');

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

module.exports = Utils;