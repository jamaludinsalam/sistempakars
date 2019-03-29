var db = require('../models');

exports.getPakar = function(req,res){
    db.PakarApi.find()
    .then(function(pakarapis){
        res.json(pakarapis);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deletePakar = function(req, res){
    db.PakarApi.remove({_id: req.params.pakarId})
    .then(function(){
        res.json({message: 'Pakar Deleted'});
    })
    .catch(function(err){
        res.send(err);
    })
}