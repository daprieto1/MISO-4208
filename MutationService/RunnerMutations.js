var Mutode = require('./models/Mutode');
var Utils = require('./UtilsService');
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
var sqs = new AWS.SQS({"accessKeyId":"", "secretAccessKey": "", "region": "us-east-2"});
var url = "https://sqs.us-east-2.amazonaws.com/401211950800/MutationQueue";

var RunnerMutations = {};

RunnerMutations.testSave= project =>{
  var mutodeReport = new Mutode({
    timestamp: (new Date()).getTime(),
    wereDiscarded:0,
    survived: 1,
    killed: 2,
    totalMutants: 10,
    coverage:82,
    project: "test",
    mutants:"m1 m2 m3"
  });

  mutodeReport.save((err, newMutodeReport) => {
      if (err) reject(err);
      console.log(newMutodeReport);
  });
}

module.exports = RunnerMutations;
