var MdroidService = {}

var MdroidExecution = require('../models/MdroidExecution')
var UtilsService = require('./UtilsService')

MdroidService.create = me => {
    me.appName = me.gitUrl.split('/')
    me.appName = me.appName[me.appName.length - 1]

    var execution
    var mdroidExecution = new MdroidExecution({
        gitUrl: me.gitUrl,
        srcPath: me.srcPath,
        testCommand: me.testCommand,
        compileCommand: me.compileCommand,
        appName: me.appName
    });

    var result = new Promise((resolve, reject) => {
        UtilsService.createFolder(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}`)
            .then(() => UtilsService.createFolder(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/original`))
            .then(() => UtilsService.createFolder(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/execution`))
            .then(() => UtilsService.createFolder(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/mutants`))
            .then(() => mdroidExecution.save((err, newMdroidExecution) => {
                if (err) reject(err);
                execution = newMdroidExecution
                resolve(newMdroidExecution);
            }))
            .catch(err => {
                console.log(err)
                reject(err)
            });
    });

    result
        .then(() => UtilsService.executeCommand(`git clone ${me.gitUrl} /Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/original`))
        .then(() => UtilsService.executeCommand(`git clone ${me.gitUrl} /Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/execution`))
        .then(() => UtilsService.executeCommand(`java -jar /Users/diegoprietotorres/Documents/programs/MDroidPlus/target/MDroidPlus-1.0.0.jar /Users/diegoprietotorres/Documents/programs/MDroidPlus/libs4ast/ /Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/original/${me.srcPath} ${me.appName} /Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/mutants/ /Users/diegoprietotorres/Documents/programs/MDroidPlus/ true `))
        .then(() => UtilsService.readFile(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/mutants/${me.appName}-mutants.log`))
        .then(mdroidData => {
            var mutants = mdroidData
                .split('\n')
                .map(line => line.split(' '))
                .filter(line => line.length > 6)
                .map(line => {
                    return {
                        line: line[line.length - 1],
                        type: line[line.length - 4],
                        path: line[line.length - 5].replace(';', ''),
                        id: line[line.length - 6].replace(':', '')
                    }
                })
            execution.mutants = mutants
            MdroidExecution.update({ _id: execution._id }, execution, (err, newExecution) => {
                if (err) console.log(err)
                else console.log('success')
            });
        })

    return result;
}

MdroidService.codeline = (meId, mId) => {
    return new Promise((resolve, reject) => {
        MdroidExecution.findById(meId, (err, me) => {
            if (err) reject(err)
            var mutant = me.mutants.find(m => m.id === mId)
            var tem = mutant.path.split('app/src/main/')
            tem = tem[tem.length - 1]

            var original = `/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/gnucash-android/original/app/src/main//AndroidManifest.xml`
            var change = `/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/gnucash-android/mutants/gnucash-android-mutant${mutant.id}/${tem}`
            var result = {}
            UtilsService.readFile(original)
                .then(originalData => {
                    result.original = originalData
                    return UtilsService.readFile(change)
                })
                .then(changeData => {
                    result.change = changeData
                    resolve(result)
                })            
        })
    })
}

module.exports = MdroidService;