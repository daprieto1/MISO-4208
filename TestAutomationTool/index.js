#! /usr/bin/env node
var program = require('commander');
var Command = require('./models/command');
var Parser = require('./parser/Parser');

var actions = [
    {
        "action": "click",
        "locator": "//"
    }
];

program
    .version('0.1.0');

program.command('analyse')
    .description('Analyse a spec file')
    .option('-p, --path <path>', 'file path')
    .action(function (filePath) {
        var newActions = actions.map(action => new Command(action));
        console.log(newActions);
    });

program.command('parse')
    .description('Parse a spec file')
    .option('-p, --path <path>', 'file path')
    .action(function (filePath) {
        console.log('Parse start');
        var commands = actions.map(action => new Command(action));
        Parser.parse(commands);
    });

program.parse(process.argv);