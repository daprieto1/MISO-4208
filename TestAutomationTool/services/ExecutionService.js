var Utils = require('./UtilsService')
var Execution = require('./../models/Execution');

var ExecutionService = {};
const CYPRESS_PROVIDER = 'cypress';
const NIGTHWATCH_PROVIDER = 'nigthwatch';
const CUCUMBER = 'cucumber';

ExecutionService.getById = executionId => {
    console.log(`ExecutionService getById start: executionId = ${executionId}`);
    return Utils.readFile(`./public/results/${executionId}/output.xml`)
        .then(xmlResult => Utils.xml2js(xmlResult))
        .then(resultdata =>
            new Promise((resolve, reject) => {
                Execution.findById(executionId, (err, execution) => {
                    if (err) reject(err);
                    execution.results = resultdata
                    resolve(execution);
                });
            })
        )
}

ExecutionService.create = execution => {
    return new Promise((resolve, reject) => {
        execution.save((err, newExecution) => {
            if (err) reject(err);
            resolve(newExecution)
        });
    });
}

ExecutionService.update = execution => {
    return new Promise((resolve, reject) => {
        Execution.update({ _id: execution._id }, execution, (err, newExecution) => {
            if (err) reject(err);
            resolve(execution)
        });
    });
}

ExecutionService.execute = (test, testSuite, providerName) => {
    return new Promise((resolve, reject) => {
        console.log(`ExecutionService execute start: providerName = ${providerName}`);
        var timestamp = (new Date()).getTime();
        var execution = new Execution({
            timestamp: timestamp,
            provider: providerName,
            testSuiteId: testSuite._id,
            name: testSuite.name,
            describe: testSuite.describe,
            assertions: testSuite.assertions.length
        });

        var executeFunction;
        switch (providerName) {
            case CYPRESS_PROVIDER:
                executeFunction = executeCypressTest;
                break;
            case NIGTHWATCH_PROVIDER:
                executeFunction = executeNigthwatchTest;
                break;
            case CUCUMBER:
                executeFunction = executeCucumberTest;
                break;
            default:
                reject(`The provider ${providerName} is not supported`);
        }

        ExecutionService.create(execution)
            .then(execution => executeFunction(test, execution))
            .then(execution => ExecutionService.update(execution))
            .then(execution => resolve(execution))
            .catch(err => reject(err));
    });
}

function executeCypressTest(test, newExecution) {
    var targetFolder = `./public/results/${newExecution._id}`;
    return Utils.removeFile('./cypress/integration/testFile.js')
        .then(() => Utils.writeFile('./cypress/integration/testFile.js', test))
        .then(() => Utils.executeCommand(`./node_modules/cypress-cli/bin/cypress run --spec cypress/integration/testFile.js`))
        .then(() => Utils.createFolder(targetFolder))
        .then(() => Utils.copyFile('./results/my-test-output.xml', `${targetFolder}/output.xml`))
        .then(() => Utils.readFile(`${targetFolder}/output.xml`))
        .then(xmlResult => Utils.xml2js(xmlResult))
        .then(resultdata => new Promise((resolve, reject) => {
            newExecution.time = resultdata.testsuites.testsuite[1].$.time
            newExecution.failures = resultdata.testsuites.testsuite[1].$.failures
            resolve(newExecution)
        }))
}

function executeCucumberTest(test, newExecution) {
    var targetFolder = `./public/results/${newExecution._id}`;
    return Utils.removeFile('./cucumber/features/test.feature')
        .then(() => Utils.writeFile('./cucumber/features/test.feature', test))
        .then(() => Utils.executeCommand(`cd cucumber && npm test`))
        .then(() => Utils.createFolder(targetFolder))
        .then(() => Utils.copyFile('./cucumber/results.xml', `${targetFolder}/output.xml`))
        .then(() => Utils.readFile(`${targetFolder}/output.xml`))
        .then(xmlResult => Utils.xml2js(xmlResult))
        .then(resultdata => new Promise((resolve, reject) => {
            newExecution.time = resultdata.testsuites.testsuite[0].$.time
            newExecution.failures = resultdata.testsuites.testsuite[0].$.failures
            resolve(newExecution)
        }))
}

module.exports = ExecutionService;