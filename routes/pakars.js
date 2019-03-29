var express     = require('express'),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Pakar       = require("../models/pakar"),
    zzzz     = require("../helpers/storage"),
    middleware  = require("../middleware"),
    multer  = require('multer'),
    path    = require('path');


//SET STORAGE ENGINE
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('image');
 
//Check file type
function checkFileType(file, cb){
    //Allowed ext
    var filetypes = /jpeg|jpg|png|gif/;
    //check ext
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime type
    var mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



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

//PAKAR POST V1
router.post("/pakar", middleware.isLoggedIn, function(req, res){
    var ciri = req.body.ciri;
    var jenis = req.body.jenis;
    var berlangsung = req.body.berlangsung;
    var penyebab = req.body.penyebab;
    var tingkat = req.body.tingkat;
    var image = req.body.image;


    var newPakar = {
        ciri: ciri,
        jenis: jenis,
        berlangsung: berlangsung,
        penyebab: penyebab,
        tingkat: tingkat,
        image: image
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

//PAKAR POST V2
router.post('/pakar2', middleware.isLoggedIn , (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('pakar/new', {
                msg: err
            });
        } else {
            if(req.file == undefined){
                res.render('pakar/new', {
                    msg: 'Error: No file Selected'
                });
            } else{
                
                var ciri = req.body.ciri;
                var jenis = req.body.jenis;
                var berlangsung = req.body.berlangsung;
                var penyebab = req.body.penyebab;
                var tingkat = req.body.tingkat;
                var image = `uploads/${req.file.filename}`;
            
                var newPakar = {
                    ciri: ciri,
                    jenis: jenis,
                    berlangsung: berlangsung,
                    penyebab: penyebab,
                    tingkat: tingkat,
                    image: image
                }
            
                Pakar.create(newPakar, function(err, newlyCreated){
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(newlyCreated);
                        res.redirect("/pakar/show");
                    }
                });
                
            }
  
            }
        });
    });


//PAKAR SHOW
router.get('/pakar/show',  middleware.isLoggedIn ,  function(req, res){
    Pakar.find({}, function(err, allPakars){
        if(err){
            console.log(err);
        } else {
            res.render('pakar/show', {pakars: allPakars});
        }
    })
});

//PAKAR DELETE
router.delete('/pakar/delete/:id', middleware.isLoggedIn, function(req, res){
    Pakar.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/pakar/show');
            console.log(err);
        } else {
            res.redirect('/pakar/show');
            console.log('success');
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