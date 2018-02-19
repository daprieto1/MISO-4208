var command = null;

function ValidateTextCommandParser(commandIn) {
    command = commandIn;
};

ValidateTextCommandParser.prototype.parseToCypress = (command) => {
    return `cy.get('${command.locator}').contains('${expectedText}')`;
};

module.exports = ValidateTextCommandParser;