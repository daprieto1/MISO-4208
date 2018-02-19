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

module.exports = Utils;