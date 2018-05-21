// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});
var sqs = new AWS.SQS({"accessKeyId":"", "secretAccessKey": "", "region": "us-east-2"});
var url = "https://sqs.us-east-2.amazonaws.com/401211950800/MutationQueue";


function sendMessage(value){
  var folderRepository = 'folderRepositories/'
  var mutationData = {};
  var messageGroupId ="MutationTestingGroup";
  var messageDeduplicationId ="MutationTestingDeduplication";
  mutationData.repository ="repositoryGit";
  mutationData.concurrency = 1;
  mutationData.mutators = ["m1","m2","m3","m3"];
  mutationData.index = "index.js";

    var repositoryPath = mutationData.repository + value;
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

   var params = {
       MessageBody: JSON.stringify(dataQueue),
       QueueUrl: url,
       MessageAttributes: {}
     };

   sqs.sendMessage(params, function(err, data) {
     if (err) console.log(err+", "+err.stack); // an error occurred
     else{
        console.log("enviado:::");           // successful response
        console.log(data);
        console.log("\n-----------------------------------------------------------------------\n");
      }

   });
}

function getMessage(){
  var params = {
     QueueUrl: url,
     MaxNumberOfMessages: 1
 };
 sqs.receiveMessage(params, function(err, data) {
   if (err) {
   console.log("Receive Error", err);
 } else if (data.Messages) {
    console.log("Recibiendo:::");
    console.log(data);
    console.log("\n-----------------------------------------------------------------------\n");
   var deleteParams = {
     QueueUrl: url,
     ReceiptHandle: data.Messages[0].ReceiptHandle
   };
   sqs.deleteMessage(deleteParams, function(err, data) {
     if (err) {
       console.log("Delete Error", err);
     } else {
       console.log("Message Deleted", data);
     }
   });
 }
 });
}


//sendMessage("1");
//sendMessage("2");
//sendMessage("3");
getMessage();
//getMessage();
