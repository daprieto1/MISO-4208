var CommandParserFactory = require('./CommandParserFactory');
const CYPRESS_PROVIDER = 'cypress';
const NIGTHWATCH_PROVIDER = 'nigthwatch';

var Parser = {};

Parser.parse = (provider) => {

    return new Promise((resolve, reject) => {
        var test = '';
        switch (provider.providerName) {
            case CYPRESS_PROVIDER:
                test = getCypressCode(provider)
                break;
            case NIGTHWATCH_PROVIDER:
                test = getNigthwatchCode(provider)
                break;
            default:
                reject(`The provider ${provider.providerName} is not supported`);
        }
        resolve(test);
    });

};

var getNigthwatchCode = (provider) => {
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
    return test;
};

var getCypressCode = (provider) => {
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



