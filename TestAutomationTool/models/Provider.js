var Assertion = require('./Assertion');

function Provider(obj) {
    if(!obj || !obj.describe || !obj.assertions)
        throw 'The configuration object for Provider is not valid';
    
    this.describe = obj.describe;
    this.assertions = [];

    obj.assertions.forEach(assertion => this.assertions.push(new Assertion(assertion)));    
}

module.exports = Provider;