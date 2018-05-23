var mongoose = require('mongoose');                     // mongoose for mongodb
// configuration =================
var mongoUri = process.env.MONGODB_URI || "mongodb://heroku_d30n00bf:r2i994t3j68i9i2sj8vfitj20@ds023468.mlab.com:23468/heroku_d30n00bf";
mongoose.connect(mongoUri, function (err, res) {
    if (err) console.log('ERROR connecting');
    else console.log('Succeeded connected');
}).catch(err => console.log(err));

var RunnerMutations = require('./RunnerMutations');
RunnerMutations.processQueue();
setInterval(function(){
  RunnerMutations.processQueue();
},180000);
