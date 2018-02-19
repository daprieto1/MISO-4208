var command = null;

function ClickCommandParser(commandIn) {
    command = commandIn;
};

ClickCommandParser.prototype.parseToCypress = () => {        
    return `cy.get('${command.locator}').click()`;
};

module.exports = ClickCommandParser;