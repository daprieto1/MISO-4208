var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MutodeSchema = new Schema({
    timestamp: Number,
    wereDiscarded: Number,
    survived: Number,
    killed: Number,
    totalMutants: Number,
    coverage: Number,
    project: String,
    mutants: String
});

module.exports = mongoose.model('Mutode', MutodeSchema);
