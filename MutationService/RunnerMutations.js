var Mutode = require('./models/Mutode');
var Utils = require('./UtilsService');
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
var sqs = new AWS.SQS({"accessKeyId":"", "secretAccessKey": "", "region": "us-east-2"});
var url = "https://sqs.us-east-2.amazonaws.com/401211950800/MutationQueue";
var folderRepository = 'folderRepositories/';
var RunnerMutations = {};

RunnerMutations.processQueue= () =>{
    var params = {
       QueueUrl: url,
       MaxNumberOfMessages: 1
   };
   sqs.receiveMessage(params, function(err, data) {
     if (err) {
       console.log("Receive Error", err);
     } else if (data.Messages) {
       console.log(data);
       RunnerMutations.processMutationProject(data.Messages[0].Body)
       var deleteParams = {
         QueueUrl: url,
         ReceiptHandle: data.Messages[0].ReceiptHandle
       };
       sqs.deleteMessage(deleteParams, function(err, data) {
         if (err) console.log("Delete Error", err);
          else console.log("Message Deleted", data);
       });
     }
     console.log("message was processed");
   });
}

RunnerMutations.processMutationProject= project =>{
    var mutationData = JSON.parse(project);
    console.log(mutationData);

    Utils.validateCreateFolder(folderRepository);

    var mutodeCommand = 'mutode --mutators ';
    var mutants ="";
    mutationData.mutators.forEach(function(mutator){
      mutants += mutator + ' ';
    });
    mutants = mutants.substring(0, mutants.length-1);
    mutodeCommand += mutants + ' ';
    mutodeCommand += '-c '+mutationData.concurrency;
    mutodeCommand += ' '+(mutationData.indexJS!= undefined? mutationData.indexJS:'');

    console.log(mutodeCommand);

    var commands= ['npm install', //install dependecies
                    mutodeCommand//run mutode
                  ];

    var resultExecution = {"project":mutationData.projectName, "mutants":mutants};
    var validateResponseMutode = function(data){
      console.log(data);
      if(data.includes('Out of ')){
          var execution  =RunnerMutations.generateReport(data);
          resultExecution.wereDiscarded =execution.wereDiscarded;
          resultExecution.totalMutants = execution.totalMutants;
          resultExecution.survived=execution.survived;
          resultExecution.killed=execution.killed;
      }

      if(data.includes('Mutant coverage: ')){
        resultExecution.coverage = parseInt(data.substring(data.lastIndexOf(" "), data.lastIndexOf("%")));
      }
    }

    var options = { cwd: './'+mutationData.gitFolder, shell:true, onData:validateResponseMutode};
    Utils.executeCommand('git clone '+mutationData.repository + ' '+mutationData.gitFolder)
    .then(()=>Utils.executeCommandsWithOptions(commands, options))
    .then(()=>RunnerMutations.saveReport(resultExecution))
    .then(()=> console.log("process done"));
}

RunnerMutations.saveReport = report =>{
  return new Promise((resolve, reject) => {
    var mutodeReport = new Mutode({
      timestamp: (new Date()).getTime(),
      wereDiscarded: report.wereDiscarded != undefined ? report.wereDiscarded : 0,
      survived: report.survived != undefined ? report.survived : 0,
      killed: report.killed != undefined ? report.killed : 0,
      totalMutants: report.totalMutants != undefined ? report.totalMutants : 0,
      coverage: report.coverage != undefined ? report.coverage : 0,
      project: report.project,
      mutants:report.mutants
    });

    mutodeReport.save((err, newMutodeReport) => {
        if (err) reject(err);
        resolve(newMutodeReport);
    });
  });
}

RunnerMutations.generateReport = dataToSave =>{
      var words = dataToSave.split(' ');
      var resultNumbers = [];
      words.forEach(function(word){
        if(!isNaN(word))
          resultNumbers.push(parseInt(word));
      });
      var result = {};
      result.wereDiscarded = resultNumbers.pop();
      result.survived = resultNumbers.pop();
      result.killed = resultNumbers.pop();
      result.totalMutants = resultNumbers.pop();
      return result;
}


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
