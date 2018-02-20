var command = null;

function ValidateTextCommandParser(commandIn) {
    command = commandIn;
};

ValidateTextCommandParser.prototype.parseToCypress = () => {
    return `cy.get('${command.locator}').contains('${command.expectedText}')`;
};

ValidateTextCommandParser.prototype.parseToNigthwatch = () => {
    return `.assert.containsText('${command.locator}', '${command.expectedText}')`;
};
module.exports = ValidateTextCommandParser;