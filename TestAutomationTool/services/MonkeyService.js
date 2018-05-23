var Monkey = require('./../models/Monkey');
var Utils = require('./UtilsService')
var nrc = require('node-run-cmd');
var AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var sqs = new AWS.SQS();
var url = "https://sqs.us-east-2.amazonaws.com/337432867796/smart-tools-app";

var MonkeyService = {};
MonkeyService.sendSQS = (dato) => {
  return new Promise((resolve, reject) => {
    var timestamp = new Date().getTime();
    var dataQueue = {
      "dato": dato,
      "timestamp": timestamp
    }
    var params = {
      MessageBody: JSON.stringify(dataQueue),
      QueueUrl: url,
      MessageAttributes: {}
    };
    var resultExecution = {"command":dato, "error":" ", "file":" ", "timestamp": timestamp};
    MonkeyService.saveReport(resultExecution)
    .then(() =>{ 
      sqs.sendMessage(params, function(err, data) {
        if (err) 
          reject(err); // an error occurred
        console.log(data);           // successful response
        resolve();
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
  });
};
MonkeyService.execute = (dato, timestamp) => {
    return new Promise((resolve, reject) => {
        var path = require("path");
        var comando = path.join(process.env.ANDROID_HOME,'platform-tools' , dato.replace("/", path.sep));
        var emulator = path.join(process.env.ANDROID_HOME,'tools', 'emulator -avd Nexus_5_PA');
        var targetFolder = path.join('./..','public','results','Monkey');
        var fileName = (new Date()).getTime().toString() + '.txt';
        var pathFile = path.join(targetFolder, fileName);
        var resultado = "";
        MonkeyService.markToRunning({"timestamp":timestamp});
        nrc.run(emulator);    
        // Se esperan 30 segundos para asegurar el que el emulador este arriba.
        Utils.createFolder(targetFolder).then(() =>{
          console.log(comando);
          setTimeout(function(){
            nrc.run(comando, {onData: dataCallback, onError: errorCallback, onDone: doneCallback}); 
          }, 30000);
    
          var dataCallback = function(data) {
              resultado += data;
              Utils.appendFile(pathFile, data);
            };
          var errorCallback = function(data) {
              Utils.appendFile(pathFile, "Error__: " + data);
            };
          var doneCallback = function(data) {
            console.log("codigo de salida: " + data);
            Utils.appendFile(pathFile, "Codigo salida: " + data);
            console.log(resultado);
            var resultExecution = {"error":data, "file":fileName, "timestamp":timestamp};
            //MonkeyService.saveReport(resultExecution)
            MonkeyService.updateReport(resultExecution)
            .then(() => {
                console.log('Actualizado OK');
                resolve('OK');
              })
            .catch(err => {
                console.log(err);
                reject(err);
              });
            };
        })
       
    });
}

MonkeyService.saveReport = report =>{
  return new Promise((resolve, reject) => {
    var monkeyReport = new Monkey({
      timestamp: report.timestamp,
      command: report.command,
      error: report.error,
      file: report.file,
      estado: 0
    });

    monkeyReport.save((err, newMonkeyReport) => {
        if (err) reject(err);
        resolve(newMonkeyReport);
    });
  });
}

MonkeyService.updateReport = report =>{
  return new Promise((resolve, reject) => {
    Monkey.update({ timestamp: report.timestamp},
      {estado: 2, file: report.file, error: report.error},
      function (err, raw) {
        if (err)  reject(err);
        console.log('the update response ', raw);
        resolve(err);
      });
  });
}

MonkeyService.markToRunning = report =>{
  return new Promise((resolve, reject) => {
    Monkey.update({ timestamp: report.timestamp},
      {estado: 1},
      function (err, raw) {
        if (err)  reject(err);
        console.log('the update mark response ', raw);
        resolve(err);
      });
  });
}

MonkeyService.pathFile = (fileName) => {
  var path = require("path");
  var targetFolder = path.join('.','public','results','Monkey');
  return(path.join(targetFolder, fileName));
};

module.exports = MonkeyService;

