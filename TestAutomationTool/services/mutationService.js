var MutationService = {};
var Utils = require('./UtilsService')
var folderRepository = 'folderRepositories/'
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
        var callback = function(data){
          console.log(data);
        }
        var options = { cwd: './'+gitFolder, shell:true, onData:callback};
        Utils.executeCommand('git clone '+repositoryPath + ' '+gitFolder)
        .then(()=>Utils.executeCommandsWithOptions(commands, options));
    });
}


module.exports = MutationService;
