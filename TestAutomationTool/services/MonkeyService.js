var Utils = require('./UtilsService')
var nrc = require('node-run-cmd');
var MonkeyService = {};

MonkeyService.execute = (dato) => {
    return new Promise((resolve, reject) => {
        var path = require("path");
        var comando = path.join(process.env.ANDROID_HOME,'platform-tools' ,dato.replace("/", path.sep));
        var emulator = path.join(process.env.ANDROID_HOME,'tools', 'emulator -avd Nexus_5_PA');
        var resultado = "";
        nrc.run(emulator);    
        // Se esperan 30 segundos para asegurar el que el emulador este arriba.
        
        nrc.run('ls', { onData: dataCallback });
        setTimeout(function(){
                nrc.run(comando, {onData: dataCallback, onError: errorCallback, onDone: doneCallback}); 
        }, 30000);
        
        var dataCallback = function(data) {
            resultado += data;
          };
        var errorCallback = function(data) {
           
          };
        var doneCallback = function(data) {
            console.log("codigo de salida: " + data);
            console.log(resultado);
          };
    });
}

module.exports = MonkeyService;

