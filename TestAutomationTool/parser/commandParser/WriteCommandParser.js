var WriteCommandParser = {};

WriteCommandParser.parseToCypress = (command) => {
    return `cy.get('${command.locator}').type('${command.text}')`;
};

module.exports = WriteCommandParser;