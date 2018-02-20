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
    .action(function (filePath) {
        console.log('Analyze start');
        Utils.readFile(filePath)
            .then(data => Analyzer.analyze(data))
            .then(provider => console.log(provider))
            .catch(err => console.log(err));
    });

program.command('parse')
    .description('Parse a spec file')
    .option('-p, --path <path>', 'file path')
    .action(function (filePath) {
        console.log('Parse start');
        Utils.readFile(filePath)
            .then(data => Analyzer.analyze(data))
            .then(provider => Parser.parse(provider))
            .catch(err => console.log(err));
    });

program.parse(process.argv);

