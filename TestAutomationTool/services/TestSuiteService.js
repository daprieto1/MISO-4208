var TestSuite = require('./../models/TestSuite');

var TestSuiteService = {};

TestSuiteService.getById = testSuiteId => {
    return new Promise((resolve, reject) => {
        console.log(`TestSuiteService getById start: testSuiteId = ${testSuiteId}`);
        TestSuite.findById(testSuiteId, (err, testSuite) => {            
            if (err) reject(err);
            resolve(testSuite);
        });
    });
}

TestSuiteService.create = () => {
    return new Promise((resolve, reject) => {
        var testSuite = new TestSuite({
            name: 'example',
            description: 'example',
            provider: 'example'
        });

        testSuite.save((err, newTestSuite) => {
            if (err) reject(err);
            resolve(newTestSuite);
        });
    });
}

module.exports = TestSuiteService;