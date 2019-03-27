var express     = require('express'),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Pakar       = require("../models/pakar"),
    helpers     = require("../helpers/pakars"),
    middleware  = require("../middleware");

//INDEX
router.get("/", function(req, res){
    res.render("pakar/index");
});

//LOGIN FORM
router.get("/login", function(req, res){
    res.render("pakar/login");
});

//LOGIN
router.post("/login", passport.authenticate("local", {
    successRedirect: "/pakar/new",
    failureRedirect: "/login"
}) ,function(req, res){     
});

//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//REGISTER CREATE
router.get("/register", function(req, res){
    res.render("pakar/register");
});

//REGISTER POST
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('pakar/register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/login");
        });
    });
});

//PAKAR CREATE
router.get("/pakar/new", middleware.isLoggedIn, function(req, res){
    res.render("pakar/new");
});

//PAKAR POST
router.post("/pakar", middleware.isLoggedIn, function(req, res){
    var ciri = req.body.ciri;
    var jenis = req.body.jenis;
    var berlangsung = req.body.berlangsung;
    var penyebab = req.body.penyebab;
    var tingkat = req.body.tingkat;


    var newPakar = {
        ciri: ciri,
        jenis: jenis,
        berlangsung: berlangsung,
        penyebab: penyebab,
        tingkat: tingkat
    }

    Pakar.create(newPakar, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            req.logout();
            res.redirect("/login");
        }
    })
})

//OPERATOR SHOW
router.get("/operator/show/:tingkat", function(req, res){
    Pakar.find({tingkat:req.params.tingkat}, function(err, allPakars){
        if(err){
            console.log(err);
        } else {
            res.render("operator/show", {pakars:allPakars});
        }
    });
});


//CATEGORY 
router.get("/operator/tingkat", function(req, res){
    res.render("operator/category");
});

module.exports = router;