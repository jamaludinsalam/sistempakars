var express                 = require('express'),
    app                     = express(),
    // port                    = process.env.PORT || 3000,
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    methodOverride          = require('method-override'),
    // fileUpload              = require('express-fileupload'),
    passportLocalMongoose   = require('passport-local-mongoose');


var url = process.env.DATABASEURL || "mongodb://localhost:27017/sistempakars";
mongoose.connect(url, { useNewUrlParser: true});
console.log(process.env.DATABASEURL);

// mongoose.connect("mongodb://jamaludinsalam:Password123@sistempakars-shard-00-00-ldvoz.mongodb.net:27017,sistempakars-shard-00-01-ldvoz.mongodb.net:27017,sistempakars-shard-00-02-ldvoz.mongodb.net:27017/test?ssl=true&replicaSet=sistempakars-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/sistempakars", { useNewUrlParser: true})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
// app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));



app.use(require('express-session')({
    secret: "Jems.co is my second account",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//ROUTES
var pakarRoutes         = require("./routes/pakars");

app.use("/", pakarRoutes);





var PORT = process.env.PORT || 3000;
//PRODUCTION
app.listen(PORT, process.env.IP, function(){
    console.log("APP HAS STARTED" + PORT);
});
