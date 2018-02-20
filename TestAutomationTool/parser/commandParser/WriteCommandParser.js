var command = null;

function WriteCommandParser(commandIn) {
    command = commandIn;
};

WriteCommandParser.prototype.parseToCypress = () => {
    return `cy.get('${command.locator}').type('${command.text}')`;
};

WriteCommandParser.prototype.parseToNigthwatch = () => {
    return `.setValue('${command.locator}', '${command.text}')`;
};

module.exports = WriteCommandParser;