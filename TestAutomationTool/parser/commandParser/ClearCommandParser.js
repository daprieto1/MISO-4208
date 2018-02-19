var command = null;

function ClearCommandParser(commandIn) {
    command = commandIn;
};

ClearCommandParser.prototype.parseToCypress = (command) => {
    return `cy.get('${command.locator}').clear()`;
};

module.exports = ClearCommandParser;