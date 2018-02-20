var CommandParserFactory = require('./CommandParserFactory');

var Parser = {};

Parser.parse = (provider) => {
    var asserts = provider.assertions.map(assertion => {
        var commandsParser = assertion.commands.map(command => CommandParserFactory.getParser(command));
        var commands = commandsParser.map(commandParser => commandParser.parseToNigthwatch()).join('\n');
        return `'${assertion.should}': function (browser) {
            browser
                ${commands}
                .end();
        }`;
    }).join(',\n\n');
    var test = `module.exports = {
        ${asserts}
    };`;
    console.log(test);

};

var getCypressCode = () => {
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
    return test;
};

module.exports = Parser;



