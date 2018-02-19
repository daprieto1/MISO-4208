var command = null;

function ValidateTextCommandParser(commandIn) {
    command = commandIn;
};

ValidateTextCommandParser.prototype.parseToCypress = () => {
    return `cy.get('${command.locator}').contains('${command.expectedText}')`;
};

module.exports = ValidateTextCommandParser;