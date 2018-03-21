function ClickCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.get('${this.command.locator}').click()`;
    };

    this.parseToNigthwatch = () => {
        return `.click('${this.command.locator}')`;
    };

    this.parseToCucumber = () => {
        return `Given I click on ${this.command.locator} locator`
    }
};

module.exports = ClickCommandParser;