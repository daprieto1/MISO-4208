var MutationService = {};
var Utils = require('./UtilsService')
var folderRepository = 'folderRepository/'
MutationService.ExecuteMutode = repositoryPath => {
    return new Promise((resolve, reject) => {
        var lastSlash = repositoryPath.lastIndexOf("/");
        var folder = repositoryPath.substring(lastSlash+1);
        var point = folder.lastIndexOf(".");

        if(point!=-1)
          folder = folder.substring(0,point);

        var gitFolder = folderRepository+folder;

        console.log("create folder: "+ folderRepository);
        Utils.validateCreateFolder(folderRepository);

        var commands= [
          'npm install', //install dependecies
          'mutode -c 1'//run mutode
        ];
        var options = { cwd: gitFolder};
        Utils.executeCommand('git clone '+repositoryPath + ' '+gitFolder)
        .then(()=>Utils.executeCommandsWithOptions(commands, options));

        // Utils.executeCommand('cd '+gitFolder +'');

        //.then(() => Utils.executeCommand('cd '+folderRepository))
        //cd '+folderRepository+' &&
        // .then(() => new Promise((resolve, reject) => {
        //     resolve()
        // }))
        // .then(() => Utils.executeCommand('cd '+folder))
        // .then(() => Utils.executeCommand('npm i'))
        // .then(() => Utils.executeCommand('mutode -c 1'))
    });
}


module.exports = MutationService;
