var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MutodeSchema = new Schema({
    wereDiscarded: Number,
    survived: Number,
    killed: Number,
    totalMutants: Number,
    coverage: Number,
    project: String
});

module.exports = mongoose.model('Mutode', MutodeSchema);
