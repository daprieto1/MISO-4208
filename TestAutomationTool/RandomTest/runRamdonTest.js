var AWS = require('aws-sdk')
var cron = require('node-cron'); 
var MonkeyService = require('./../services/MonkeyService');
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
});

var sqs = new AWS.SQS();
var url = "https://sqs.us-east-2.amazonaws.com/337432867796/smart-tools-app";

var isEjecutando = false;

var params = {
    MaxNumberOfMessages: 1,
    QueueUrl: url,
    WaitTimeSeconds: 20
};

var deleteMsg = (receiptHandle) => {
    var deleteParams = {
        QueueUrl: url,
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

};

var mensajeRecibido;
cron.schedule('*/1 * * * *', () => {
    console.log("Tiempo CRON RandomTest");
    if(isEjecutando)
      return;
    isEjecutando = true;
    console.log("Inicia RandomTest");
    console.log(new Date());
    sqs.receiveMessage(params, function(err, data) {
        if (err) {
            console.log("Receive Error", err);
            isEjecutando = false;
        } else if (data.Messages) {
            mensajeRecibido = data.Messages[0];
            console.log(data);
            datos = JSON.parse(mensajeRecibido.Body);
            MonkeyService.execute(datos.dato).then(() => {
                console.log("Fin monkey OK");
                deleteMsg(mensajeRecibido.ReceiptHandle).then(() => {
                    isEjecutando = false;
                }).catch(err => console.log(err));
            })
            .catch(err => {
                console.log("Fin monkey Error");
                console.log(err);
                isEjecutando = false;
            });
        } else {
            isEjecutando = false;
        }
        console.log("message was processed");
    });   
    console.log("Mensaje Procesado");
    console.log(new Date());
});

function sleep(milliseconds) {
    var start = new Date().getTime();
    while(1)
        if((new Date().getTime() - start) > milliseconds)
            break;

}
