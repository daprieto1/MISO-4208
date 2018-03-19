function ValidateTextCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.contains('${this.command.expectedText}')`;
    };

    this.parseToNigthwatch = () => {
        return `.assert.containsText('${this.command.locator}', '${this.command.expectedText}')`;
    };
};

module.exports = ValidateTextCommandParser;