var Command = require('./Command');

function Assertion(obj) {
    if(!obj || !obj.should || !obj.actions)
        throw 'The configuration object for Assertion is not valid';
    
    this.should = obj.should;
    this.commands = [];

    obj.actions.forEach(action => this.commands.push(new Command(action)));    
}

module.exports = Assertion;