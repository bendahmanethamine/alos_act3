

let _ = require("lodash");
let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
//import passport from "passport";

let passport = require("passport");
let passportJWT = require("passport-jwt");
let users = require("../public/usersDB.json");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;


let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mysecretword';

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    let user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user)
        next(null, user);
    else
        next(null, false);

});

passport.use(strategy);

let app = express();
app.use(passport.initialize());


app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json())

router.get("/", function (req, res) {
    res.json({message: "The app is running!"});
});

router.get("/signin", function (req, res) {
    // make html with signin form
    res.send("<form method='post' action='/auth/login'><input type='text' name='name' /><input type='password' name='password' /><button type='submit'>Sign In</button></form>");
});
router.get("/signup", function (req, res) {
    // make html with signup form
    res.send("<form method='post' action='/auth/checksignup'><input type='text' name='newname' /><input type='password' name='newpassword' /><button type='submit'>Sign Up</button></form>");
});
router.get("/checksignup", function (req, res) {
    // check if user is in users.json
    let user = users[_.findIndex(users, {name: req.query.name})];
    if (user)
        res.send("User already exists");
    else {
        // add user to users.json
        users.push({id: users.length, name: req.query.name, password: req.query.password});
        // update users.json
    }
});

router.post("/login", function (req, res) {
    let name = "";
    let password = "";
    if (req.body.name && req.body.password) {
        name = req.body.name;
        password = req.body.password;
    } else {
        res.json({
            success: false,
            message: "Please enter name and password" + name + " " + password
        });
    }
    // usually this would be a database call:
    let user = users[_.findIndex(users, {name: name})];
    if (!user) {
        res.status(401).json({message: "no such user found"});
    }

    if (user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        let payload = {id: user.id};
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        req.headers.authorization = token;
        res.json({message: "ok", token: token,info:req.headers});
    } else {
        res.status(401).json({message: "invalid credentials" + name + " " + password});
    }
});

router.get("/secret", passport.authenticate('jwt', {session: false}), function (req, res) {
    res.json({message: "Success!"});
});

router.get("/secretDebug",
    function (req, res, next) {
        console.log(req.get('Authorization'));
        next();
    }, function (req, res) {
        res.json("debugging");
    });
router.get("/signout", function (req, res) {
    // User has logged out, delete the token
    //req.logOut();
    // Unset req.headers.authorization to delete the token & destroy the session
    delete req.headers.authorization;
    //req.session.destroy();
    res.redirect("signin");

});

module.exports = router;
