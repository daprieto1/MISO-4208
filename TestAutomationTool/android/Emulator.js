var Utils = require('../Utils');

var Emulator = {};

Emulator.Iniciar = () => {
    
    Utils.executeCommand('C:\\Users\\JESUSALFONSO\\AppData\\Local\\Android\\Sdk\\tools\\emulator -avd Nexus_5_PA');
}

module.exports = Emulator;