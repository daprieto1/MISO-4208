var command = null;

function NavigateCommandParser(commandIn) {
    command = commandIn;
};

NavigateCommandParser.prototype.parseToCypress = () => {        
    return `cy.visit('${command.url}')`;
};

NavigateCommandParser.prototype.parseToNigthwatch = () => {
    return ``;
};

module.exports = ClickCommandParser;