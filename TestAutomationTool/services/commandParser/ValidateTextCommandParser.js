function ValidateTextCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.contains('${this.command.expectedText}')`;
    };

    this.parseToNigthwatch = () => {
        console.log(this.command.expectedText);
        return `.assert.containsText('${this.command.locator}', '${this.command.expectedText}')`;
    };

    this.parseToCucumber = () => {
        return `Given I wait to see ${this.command.expectedText} text on ${this.command.locator} locator`;
    }
};

module.exports = ValidateTextCommandParser;