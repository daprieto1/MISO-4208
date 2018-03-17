var express = require('express');

var TestSuiteService = require('./../services/TestSuiteService');

var routes = function (TestSuite) {
    var testSuiteRouter = express.Router();

    testSuiteRouter.route('/')
        .get(function (req, res) {
            TestSuite.find(function (err, testSuites) {
                if (err) res.send(err)
                res.json(testSuites);
            });
        })
        .post(function (req, res) {
            TestSuiteService.create()
                .then(testSuite => res.status(200).send(testSuite))
                .catch(err => res.status(500).send(err));
        });

    return testSuiteRouter;
};

module.exports = routes;