var mongoose = require('mongoose');

var pakarSchema = new mongoose.Schema({
    ciri: String,
    jenis: String,
    berlangsung: String,
    penyebab: String,
    tingkat: String,
    image: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Pakar", pakarSchema);