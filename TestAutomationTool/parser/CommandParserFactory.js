var ClickCommandParser = require('./commandParser/ClickCommandParser');
var ClearCommandParser = require('./commandParser/ClearCommandParser');
var WriteCommandParser = require('./commandParser/WriteCommandParser');
var ValidateTextCommandParser = require('./commandParser/ValidateTextCommandParser');

var CommandParserFactory = {};

CommandParserFactory.getParser = (command) => {
    var commandParser = null;
    switch (command.action) {
        case 'click':
            commandParser = new ClickCommandParser(command);
            break;
        case 'clear':
            commandParser = new ClearCommandParser(command);
            break;
        case 'write':
            commandParser = new WriteCommandParser(command);
            break;
        case 'validateText':
            commandParser = new ValidateTextCommandParser(command);
            break;
        default:
            console.log('Command Parser does not exists');
            break;
    }
    return commandParser;
};

module.exports = CommandParserFactory;