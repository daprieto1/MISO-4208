var Provider = require('../models/Provider');

var Analizer = {};

Analizer.analyze = (jsonConfig) => {
    return new Promise((resolve, reject) => {
        try {
            var obj = JSON.parse(jsonConfig);
            var provider = new Provider(obj);
            resolve(provider);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = Analizer;