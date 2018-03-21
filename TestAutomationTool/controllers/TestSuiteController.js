var express = require('express');

var TestSuiteService = require('./../services/TestSuiteService');
var AnalizerService = require('./../services/AnalizerService');
var ParserService = require('./../services/ParserService');
var ExecutionService = require('./../services/ExecutionService');

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

    testSuiteRouter.route('/:id/tests/:providerName')
        .get((req, res) => {
            var testSuiteId = req.params.id;
            var providerName = req.params.providerName;
            var testSuite;

            console.log(`TestSuitecontroller execute start: id = ${testSuiteId}, providerName = ${providerName}`);
            TestSuiteService.getById(testSuiteId)
                .then(ts => {
                    testSuite = ts;
                    return AnalizerService.analyze(testSuite, providerName)
                })
                .then(provider => ParserService.parse(provider))
                .then(test => res.status(200).send(test))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        });
    testSuiteRouter.route('/:id/execute/:providerName')
        .post((req, res) => {
            var testSuiteId = req.params.id;
            var providerName = req.params.providerName;
            var testSuite;

            console.log(`TestSuitecontroller execute start: id = ${testSuiteId}, providerName = ${providerName}`);
            TestSuiteService.getById(testSuiteId)
                .then(ts => {
                    testSuite = ts;
                    return AnalizerService.analyze(testSuite, providerName)
                })
                .then(provider => ParserService.parse(provider))
                .then(test => ExecutionService.execute(test, testSuite, providerName))
                .then(execution => res.status(200).send(execution))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        });

    return testSuiteRouter;
};

module.exports = routes;