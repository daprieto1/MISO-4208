var CommandParserFactory = require('./CommandParserFactory');

var Parser = {};

Parser.parse = (provider) => {

    var asserts = provider.assertions.map(assertion => {
        var commandsParser = assertion.commands.map(command => CommandParserFactory.getParser(command));
        var commands = commandsParser.map(commandParser => commandParser.parseToCypress()).join('\n');
        return `it('${assertion.should}', function () {
            ${commands}
        })`;
    }).join('\n');
    var test = `describe('${provider.describe}', function () {
        ${asserts}
    })`;
    console.log(test);

};

module.exports = Parser;
