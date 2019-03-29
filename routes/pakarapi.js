var express = require('express'),
    router  = express.Router(),
    db      = require('../models'),
    PakarApi= require('../models/pakarapi'),
    helpers = require('../helpers/pakars');
    
// router.route('/')
//     .get(helpers.getPakar)

// router.route('/:pakarId')
//     .delete(helpers.deletePakar)


//PAKAR SHOW
router.get("/", function(req, res){
    PakarApi.find({}, function(err, allPakars){
        if(err){
            console.log(err);
        } else {
            res.json(allPakars);
        }
    });
});

module.exports = router;