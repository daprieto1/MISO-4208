var Utils = require('./UtilsService')
var Execution = require('./../models/Execution');

var ExecutionService = {};
const CYPRESS_PROVIDER = 'cypress';
const NIGTHWATCH_PROVIDER = 'nigthwatch';

ExecutionService.create = execution => {
    return new Promise((resolve, reject) => {
        execution.save((err, newExecution) => {
            if (err) reject(err);
            resolve(newExecution)
        });
    });
}

ExecutionService.execute = (test, providerName) => {
    return new Promise((resolve, reject) => {
        var timestamp = (new Date()).getTime();
        var execution = new Execution({
            timestamp: timestamp,
            provider: providerName
        });

        var executeFunction;
        switch (providerName) {
            case CYPRESS_PROVIDER:
                executeFunction = executeCypressTest;
                break;
            case NIGTHWATCH_PROVIDER:
                executeFunction = executeNigthwatchTest;
                break;
            default:
                reject(`The provider ${providerName} is not supported`);
        }

        ExecutionService.create(execution)
            .then(newExecution => executeFunction(test, newExecution))
            .then(completeExecution => resolve(completeExecution))
            .catch(err => reject(err));
    });
}

function executeCypressTest(test, newExecution) {
    return Utils.removeFile('./cypress/integration/testFile.js')
        .then(() => Utils.writeFile('./cypress/integration/testFile.js', test))
        .then(() => Utils.executeCommand(`./node_modules/cypress-cli/bin/cypress run --spec cypress/integration/testFile.js`))
}

module.exports = ExecutionService;