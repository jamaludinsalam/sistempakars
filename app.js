var express                 = require('express'),
    app                     = express(),
    port                    = process.env.PORT || 3000,
    mongoose                = require('mongoose'),
    bodyParser              = require('body-parser'),
    User                    = require('./models/user'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    methodOverride          = require('method-override'),
    passportLocalMongoose   = require('passport-local-mongoose');

app.use(methodOverride("_method"));
mongoose.connect("mongodb://jamaludinsalam:Password123@sistempakars-shard-00-00-ldvoz.mongodb.net:27017,sistempakars-shard-00-01-ldvoz.mongodb.net:27017,sistempakars-shard-00-02-ldvoz.mongodb.net:27017/test?ssl=true&replicaSet=sistempakars-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true});

// mongoose.connect("mongodb://localhost:27017/sistempakars", { useNewUrlParser: true})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));



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
var pakarRoutes         = require("./routes/pakars"),
    pakarApiRoutes     = require("./routes/pakarapi");

app.use("/", pakarRoutes);
app.use("/pakar/api", pakarApiRoutes);




app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
});
