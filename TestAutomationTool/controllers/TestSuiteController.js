var express = require('express');

var TestSuiteService = require('./../services/TestSuiteService');
var AnalizerService = require('./../services/AnalizerService');

var routes = function (TestSuite) {
    var testSuiteRouter = express.Router();

    testSuiteRouter.route('/')
        .get((req, res) => {
            TestSuite.find(function (err, testSuites) {
                if (err) res.send(err)
                res.json(testSuites);
            });
        })
        .post((req, res) => {
            TestSuiteService.create()
                .then(testSuite => res.status(200).send(testSuite))
                .catch(err => res.status(500).send(err));
        });

    testSuiteRouter.route('/execute')
        .post((req, res) => {
            TestSuiteService.getById('5aaf2b6db8db8e2e853a3a46')
                .then(testSuite => AnalizerService.analyze(testSuite, 'cypress'))
                .then(provider => console.log(provider))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        });

    return testSuiteRouter;
};

module.exports = routes;