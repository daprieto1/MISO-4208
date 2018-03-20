var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var executionSchema = new Schema({
    timestamp: Number,
    testSuiteId: String,
    name: String,
    describe: String,
    assertions: Number,
    provider: String,
    testUrl: String,
    results: Object
});

module.exports = mongoose.model('Execution', executionSchema);