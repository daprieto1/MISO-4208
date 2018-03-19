function ClearCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.get('${this.command.locator}').clear()`;
    };

    this.parseToNigthwatch = () => {
        return ``;
    };
};

module.exports = ClearCommandParser;