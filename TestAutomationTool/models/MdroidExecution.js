var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var mdroidExecutionSchema = new Schema({
    gitUrl: String,
    srcPath: String,
    testCommand: String,
    compileCommand: String,
    appName: String,
    mutants: { type : Array , "default" : [] }
});

module.exports = mongoose.model('MdroidExecution', mdroidExecutionSchema);