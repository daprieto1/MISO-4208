var command = null;

function ClearCommandParser(commandIn) {
    command = commandIn;
};

ClearCommandParser.prototype.parseToCypress = () => {
    return `cy.get('${command.locator}').clear()`;
};

ClearCommandParser.prototype.parseToNigthwatch = () => {
    return ``;
};

module.exports = ClearCommandParser;