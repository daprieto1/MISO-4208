var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MonkeySchema = new Schema({
    timestamp: Number,
    command: String,
    error: Number,
    file: String
});

module.exports = mongoose.model('Monkey', MonkeySchema);
