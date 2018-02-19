function Command(obj) {
    this.action = obj.action;
    this.locator = obj.locator;
    this.text = obj.text;
    this.expectedText = obj.expectedText;
}

module.exports = Command;