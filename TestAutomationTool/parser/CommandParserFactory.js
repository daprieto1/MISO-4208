var ClickCommandParser = require('./commandParser/ClickCommandParser');
var CommandParserFactory = {};

CommandParserFactory.getParser = (command) => {
    var commandParser = null;    
    switch (command.action) {
        case 'click':
            commandParser = new ClickCommandParser(command);
            break;
        default:
            console.log('Command Parser does not exists');
            break;
    }
    return commandParser;
};

module.exports = CommandParserFactory;