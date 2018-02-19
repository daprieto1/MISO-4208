var CommandParserFactory = require('./CommandParserFactory');

var Parser = {};

Parser.parse = (commands) => {
    var commandsParser = commands.map(command => CommandParserFactory.getParser(command));
    commandsParser.forEach(commandParser => console.log(commandParser.parseToCypress()));
};

module.exports = Parser;