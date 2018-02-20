var command = null;

function ClickCommandParser(commandIn) {
    command = commandIn;
};

ClickCommandParser.prototype.parseToCypress = () => {        
    return `cy.get('${command.locator}').click()`;
};

ClickCommandParser.prototype.parseToNigthwatch = () => {
    return `.click('${command.locator}')`;
};

module.exports = ClickCommandParser;