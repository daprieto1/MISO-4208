function Command(obj) {
    if(!obj || !obj.action)
        throw 'The configuration object for COmmand is not valid';

    this.url = obj.url;
    this.action = obj.action;
    this.locator = obj.locator;
    this.text = obj.text;
    this.expectedText = obj.expectedText;
}

module.exports = Command;