var command = null;

function WriteCommandParser(commandIn) {
    command = commandIn;
};

WriteCommandParser.prototype.parseToCypress = (command) => {
    return `cy.get('${command.locator}').type('${command.text}')`;
};

module.exports = WriteCommandParser;