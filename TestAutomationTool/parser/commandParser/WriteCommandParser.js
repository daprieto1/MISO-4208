function WriteCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {
        return `cy.get('${this.command.locator}').type('${this.command.text}')`;
    };

    this.parseToNigthwatch = () => {
        return `.setValue('${this.command.locator}', '${this.command.text}')`;
    };
};

module.exports = WriteCommandParser;