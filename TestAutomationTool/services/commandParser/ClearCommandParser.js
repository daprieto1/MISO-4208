function ClearCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.get('${this.command.locator}').clear()`;
    };

    this.parseToNigthwatch = () => {
        return ``;
    };

    this.parseToCucumber = () => {
        return `Given I clean ${this.command.locator} locator`
    }
};

module.exports = ClearCommandParser;