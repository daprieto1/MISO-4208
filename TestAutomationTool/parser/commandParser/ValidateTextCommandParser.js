var ValidateTextCommandParser = {};

ValidateTextCommandParser.parseToCypress = (command) => {
    return `cy.get('${command.locator}').contains('${expectedText}')`;
};

module.exports = ValidateTextCommandParser;