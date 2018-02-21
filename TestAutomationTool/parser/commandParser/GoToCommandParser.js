function GoToCommandParser(commandIn) {
    this.command = commandIn;

    this.parseToCypress = () => {           
        return `cy.visit('${this.command.url}')`;
    };

    this.parseToNigthwatch = () => {
        return `.url('${this.command.url}')`;
    };
};

module.exports = GoToCommandParser;