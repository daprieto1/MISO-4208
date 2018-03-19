var Provider = require('./../models/Provider');

var AnalizerService = {};

AnalizerService.analyze = (testSuite, providerName) => {
    return new Promise((resolve, reject) => {
        console.log(`AnalizerService analyze start: providerName = ${providerName}`);
        try {            
            var obj = JSON.parse(JSON.stringify(testSuite));
            obj.providerName = providerName;
            var provider = new Provider(obj);
            resolve(provider);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = AnalizerService;