var command = null;

function ClickCommandParser(commandIn) {
    command = commandIn;
};

ClickCommandParser.prototype.parseToCypress = () => {    
    console.log(command);
    return `cy.get('${command.locator}').click()`;
};

module.exports = ClickCommandParser;