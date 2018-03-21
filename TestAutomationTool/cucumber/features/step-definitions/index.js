var { defineSupportCode } = require('cucumber');
var { expect } = require('chai');

defineSupportCode(({ Given, When, Then }) => {
    Given(/^I go to (.*)$/, url => {
        browser.url(url);
    });

    Given(/^I click on (.*) locator$/, locator => {
        browser.element(locator).click();
    });

    Given(/^I write (.*) text on the (.*) locator$/, (text, locator) => {
        var element = browser.element(locator);
        element.keys(text);
    });

    Given(/^I wait to see (.*) text on (.*) locator$/, (expectedText, locator) => {
        browser.waitForVisible(locator, 5000);
    });
});