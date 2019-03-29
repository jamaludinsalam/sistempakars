var mongoose = require('mongoose');

var pakarSchema = new mongoose.Schema({
    ciri: String,
    jenis: String,
    berlangsung: String,
    penyebab: String,
    tingkat: String,
    created: {type: Date, default: Date.now}
});

var PakarApi = mongoose.model('PakarApi', pakarSchema);

module.exports = PakarApi;