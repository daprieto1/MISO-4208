var Monkey = require('./../models/Monkey');
var Utils = require('./UtilsService')
var nrc = require('node-run-cmd');
var MonkeyService = {};

MonkeyService.execute = (dato) => {
    return new Promise((resolve, reject) => {
        var path = require("path");
        var comando = path.join(process.env.ANDROID_HOME,'platform-tools' , dato.replace("/", path.sep));
        var emulator = path.join(process.env.ANDROID_HOME,'tools', 'emulator -avd Nexus_5_PA');
        var targetFolder = path.join('.','public','results','Monkey');
        var fileName = (new Date()).getTime().toString() + '.txt';
        var pathFile = path.join(targetFolder, fileName);
        var resultado = "";
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
              Utils.appendFile(pathFile, "Error: " + data);
            };
          var doneCallback = function(data) {
            console.log("codigo de salida: " + data);
            Utils.appendFile(pathFile, "Codigo salida: " + data);
            console.log(resultado);
            var resultExecution = {"command":dato, "error":data, "file":fileName};
            MonkeyService.saveReport(resultExecution)
            .then(() => {
                console.log('Guardado OK');
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
      timestamp: (new Date()).getTime(),
      command: report.command,
      error: report.error,
      file: report.file,
    });

    monkeyReport.save((err, newMonkeyReport) => {
        if (err) reject(err);
        resolve(newMonkeyReport);
    });
  });
}

module.exports = MonkeyService;

