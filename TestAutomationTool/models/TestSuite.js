var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testSuiteSchema = new Schema({
    name: String,
    description: String,
    provider: String
});

module.exports = mongoose.model('TestSuite', testSuiteSchema);