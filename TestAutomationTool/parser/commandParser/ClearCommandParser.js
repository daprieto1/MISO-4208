var ClearCommandParser = {};

ClearCommandParser.parseToCypress = (command) => {
    return `cy.get('${command.locator}').clear()`;
};

module.exports = ClearCommandParser;