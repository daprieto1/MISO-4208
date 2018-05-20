var Mutode = require('./../models/Mutode');
var Utils = require('./UtilsService');
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-west-2'});

var MutationService = {};

var folderRepository = 'folderRepositories/'

MutationService.saveQueue = mutationData =>{
  var repositoryPath = mutationData.repository;
  var lastSlash = repositoryPath.lastIndexOf("/");
  var folder = repositoryPath.substring(lastSlash+1);
  var point = folder.lastIndexOf(".");

  if(point!=-1)
    folder = folder.substring(0,point);

  var gitFolder = folderRepository+folder;

  var dataQueue = {
        "repository":mutationData.repository,
        "concurrency": mutationData.concurrency,
        "mutators": mutationData.mutators,
        "indexJS": mutationData.index!= undefined? mutationData.index:'',
        "gitFolder": gitFolder
      }
 var sqs = new AWS.SQS({"accessKeyId":"AKIAIEACZYSRV56EUMKA", "secretAccessKey": "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", "region": "us-west-2"});
 var params = {
     MessageBody: JSON.stringify(dataQueue),
     QueueUrl: "https://sqs.us-west-2.amazonaws.com/563508585557/ProjectsToRunMutationTesting.fifo",
     MessageAttributes: {
       someKey: { DataType: 'String', StringValue: "string"}
     }
   };
console.log("sending to queue")
 sqs.sendMessage(params, function(err, data) {
   if (err) common.logError(err, err.stack); // an error occurred
   else     common.log(data);           // successful response
 });

}

MutationService.ExecuteMutode = mutationData => {
    return new Promise((resolve, reject) => {
        var repositoryPath = mutationData.repository;
        var lastSlash = repositoryPath.lastIndexOf("/");
        var folder = repositoryPath.substring(lastSlash+1);
        var point = folder.lastIndexOf(".");

        if(point!=-1)
          folder = folder.substring(0,point);

        var gitFolder = folderRepository+folder;

        Utils.validateCreateFolder(folderRepository);
        var mutodeCommand = 'mutode --mutators ';
        var mutants ="";
        mutationData.mutators.forEach(function(mutator){
          mutants += mutator + ' ';
        });
        mutants = mutants.substring(0, mutants.length-1);
        mutodeCommand += mutants + ' ';
        mutodeCommand += '-c '+mutationData.concurrency;
        mutodeCommand += ' '+(mutationData.index!= undefined? mutationData.index:'');

        console.log(mutodeCommand);

        var commands= ['npm install', //install dependecies
                        mutodeCommand//run mutode
                      ];

        var resultExecution = {"project":folder, "mutants":mutants};
        var validateResponseMutode = function(data){
          console.log(data);
          if(data.includes('Out of ')){
              var execution  =MutationService.generateReport(data);
              resultExecution.wereDiscarded =execution.wereDiscarded;
              resultExecution.totalMutants = execution.totalMutants;
              resultExecution.survived=execution.survived;
              resultExecution.killed=execution.killed;
          }

          if(data.includes('Mutant coverage: ')){
            resultExecution.coverage = parseInt(data.substring(data.lastIndexOf(" "), data.lastIndexOf("%")));
          }
        }

        var options = { cwd: './'+gitFolder, shell:true, onData:validateResponseMutode};
        Utils.executeCommand('git clone '+repositoryPath + ' '+gitFolder)
        .then(()=>Utils.executeCommandsWithOptions(commands, options))
        .then(()=>MutationService.saveReport(resultExecution));
    });
}


MutationService.saveReport = report =>{
  return new Promise((resolve, reject) => {
    var mutodeReport = new Mutode({
      timestamp: (new Date()).getTime(),
      wereDiscarded: report.wereDiscarded,
      survived: report.survived,
      killed: report.killed,
      totalMutants: report.totalMutants,
      coverage: report.coverage,
      project: report.project,
      mutants:report.mutants
    });

    mutodeReport.save((err, newMutodeReport) => {
        if (err) reject(err);
        resolve(newMutodeReport);
    });
  });
}

MutationService.generateReport = dataToSave =>{
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



module.exports = MutationService;
