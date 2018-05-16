var AWS = require('aws-sdk')
var UtilsService = require('./../services/UtilsService')
var cron = require('node-cron');
var mongoose = require('mongoose')

var mongoUri = process.env.MONGODB_URI || "mongodb://heroku_d30n00bf:r2i994t3j68i9i2sj8vfitj20@ds023468.mlab.com:23468/heroku_d30n00bf";
mongoose
    .connect(mongoUri, function (err, res) {
        if (err) {
            console.log('ERROR connecting');
        } else {
            console.log('Succeeded connected');
        }
    })
    .catch(err => console.log(err))

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

var sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
var queueURL = 'https://sqs.us-west-2.amazonaws.com/101852430854/create-mutants.fifo'

var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    WaitTimeSeconds: 20
}

var deleteMsg = (receiptHandle) => {
    var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: receiptHandle
    };
    return new Promise((resolve, reject) => {
        sqs.deleteMessage(deleteParams, function (err, data) {
            if (err) {
                console.log(`deleteMessage ERROR: ${err}`);
                reject(err)
            } else {
                console.log('deleteMessage SUCCESS');
                resolve()
            }
        })
    })

}

cron.schedule('* * * * *', () => {
    console.log(new Date())
    sqs.receiveMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err)
        } else if (data.Messages) {
            var me = { appName: 'carreport', gitUrl: 'https://github.com/codinguser/gnucash-android', srcPath: 'app/src/main/' }
            var baseFolder = '/Users/diegoprietotorres/Documents/programs/MDroidPlus';
            UtilsService.createFolder(`${baseFolder}/tmp/${me.appName}`)
                .then(() => UtilsService.createFolder(`${baseFolder}/tmp/${me.appName}/original`))
                .then(() => UtilsService.createFolder(`${baseFolder}/tmp/${me.appName}/execution`))
                .then(() => UtilsService.createFolder(`${baseFolder}/tmp/${me.appName}/mutants`))
                .then(() => UtilsService.executeCommand(`git clone ${me.gitUrl} ${baseFolder}/tmp/${me.appName}/original`))
                .then(() => UtilsService.executeCommand(`git clone ${me.gitUrl} ${baseFolder}/tmp/${me.appName}/execution`))
                .then(() => UtilsService.executeCommand(`java -jar /Users/diegoprietotorres/Documents/programs/MDroidPlus/target/MDroidPlus-1.0.0.jar /Users/diegoprietotorres/Documents/programs/MDroidPlus/libs4ast/ ${baseFolder}/tmp/${me.appName}/original/${me.srcPath} ${me.appName} ${baseFolder}/tmp/${me.appName}/mutants/ /Users/diegoprietotorres/Documents/programs/MDroidPlus/ true `))
                .then(() => UtilsService.readFile(`/Users/diegoprietotorres/Documents/programs/MDroidPlus/tmp/${me.appName}/mutants/${me.appName}-mutants.log`))                
                .then(() => deleteMsg(data.Messages[0].ReceiptHandle))
                .catch(err => console.log(err))
        }
    })
})