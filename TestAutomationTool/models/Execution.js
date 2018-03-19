var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var executionSchema = new Schema({
    insertionDate: Date,
    timestamp: Number,
    beforeImgUri: String,
    afterImgUri: String,
    provider: String,
    testUrl: String,
    result: Object
});

module.exports = mongoose.model('Execution', executionSchema);