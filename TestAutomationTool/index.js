#! /usr/bin/env node
var Utils = require('./Utils');
var program = require('commander');
var Command = require('./models/Command');
var Parser = require('./parser/Parser');
var Analyzer = require('./analyzer/Analizer');

program
    .version('0.1.0');

program.command('analyze')
    .description('Analyse a spec file')
    .option('-p, --path <path>', 'file path')
    .option('-pr, --provider <provider>', 'provider to use')
    .action(function (filePath, providerName) {
        console.log('Analyze start');
        Utils.readFile(filePath)
            .then(data => Analyzer.analyze(data, providerName))
            .then(provider => console.log(provider))
            .catch(err => console.log(err));
    });

program.command('parse')
    .description('Parse a spec file')
    .option('-p, --path <path>', 'file path')
    .option('-pr, --provider <provider>', 'provider to use')
    .action(function (filePath, providerName) {
        console.log('Parse start');
        var locationPath = `/Users/diegoprietotorres/Documents/programs/MISO-4208/TestAutomationTool/cypress/integration/test${(new Date()).getTime()}.js`;
        Utils.readFile(filePath)
            .then(data => Analyzer.analyze(data, providerName))
            .then(provider => Parser.parse(provider))
            .then(test => Utils.writeFile(locationPath, test))
            .then(() => console.log(`The file has been generated in ${locationPath}`))
            .catch(err => console.log(err));
    });

program.command('execute')
    .description('Parse a spec file')
    .option('-p, --path <path>', 'file path')
    .option('-pr, --provider <provider>', 'provider to use')
    .action(function (filePath, providerName) {
        console.log('Parse start');
        var fileName = `cypress/integration/test${(new Date()).getTime()}.js`;
        var locationPath = `/Users/diegoprietotorres/Documents/programs/MISO-4208/TestAutomationTool/${fileName}`;
        Utils.readFile(filePath)
            .then(data => Analyzer.analyze(data, providerName))
            .then(provider => Parser.parse(provider))
            .then(test => Utils.writeFile(locationPath, test))
            .then(() => Utils.executeCommand(`cypress run --spec ${fileName}`))
            .catch(err => console.log(err));
    });

program.parse(process.argv);

