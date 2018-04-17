var fs = require('fs');
var nrc = require('node-run-cmd');
var parseString = require('xml2js').parseString;

var UtilsService = {};

UtilsService.xml2js = xml => {
    return new Promise((resolve, reject) => {
        parseString(xml, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}

UtilsService.copyFile = (source, target) => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService copyFile start: source = ${source}, target = ${target}`);
        fs.copyFile(source, target, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

UtilsService.removeFile = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) resolve(err);
            resolve();
        });
    });
}

UtilsService.cleanFolder = path => {
    return new Promise((resolve, reject) => {
        fs.rmdir(path, (err) => {
            if (err) resolve(err);
            resolve();
        });
    });
}

UtilsService.createFolder = path => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService createFolder start: path = ${path}`);
        fs.mkdir(path, (err) => {
            if (err) resolve(err);
            resolve();
        });
    });
}

UtilsService.readFile = (path) => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService readFile start: path = ${path}`);
        fs.readFile(path, 'utf-8', (err, data) => {
            if (!err) resolve(data);
            else reject(err);
        });
    });
};

UtilsService.writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err)
            resolve();
        });
    });
};

UtilsService.validateCreateFolder = (path) => {
  return new Promise((resolve, reject) => {
      fs.exists(path, (exists) => {
          if (!exists){
            UtilsService.createFolder(path);
            resolve();
        }
      });
  });
};

UtilsService.executeCommand = command => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService executeCommand start: command = ${command}`);
        nrc.run(command)
            .then(function (exitCodes) {
                console.log(`UtilsService executeCommand ends: exitCodes = ${exitCodes}`);
                resolve();
            }, function (err) {
                console.log(`UtilsService executeCommand ends: error = ${err}`);
                reject(err);
            });
    });
};

UtilsService.executeCommandsWithOptions = (commands,options) => {
    return new Promise((resolve, reject) => {
        commands.forEach(function(command){
          console.log(`UtilsService executeCommand start: command = ${command}`);
        })
        nrc.run(commands,options)
            .then(function (exitCodes) {
                console.log(`UtilsService executeCommand ends: exitCodes = ${exitCodes}`);
                resolve();
            }, function (err) {
                console.log(`UtilsService executeCommand ends: error = ${err}`);
                reject(err);
            });
    });
};
module.exports = UtilsService;
