var Assertion = require('./Assertion');

function Provider(obj, providerName) {
    if (!obj ||
        !obj.describe ||
        !obj.providerName ||
        !obj.assertions)
        throw 'The configuration object for Provider is not valid';

    this.providerName = obj.providerName;
    this.describe = obj.describe;
    this.assertions = [];

    obj.assertions.forEach(assertion => this.assertions.push(new Assertion(assertion)));
}

module.exports = Provider;