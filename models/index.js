var mongoose = require('mongoose');
mongoose.set('debug', true);
// mongoose.connect('mongodb://jamaludinsalam:Password123@sistempakars-shard-00-00-ldvoz.mongodb.net:27017,sistempakars-shard-00-01-ldvoz.mongodb.net:27017,sistempakars-shard-00-02-ldvoz.mongodb.net:27017/test?ssl=true&replicaSet=sistempakars-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/sistempakar', {useNewUrlParser: true});

mongoose.Promise =  Promise;

module.exports.PakarApi = require("./pakarapi");
