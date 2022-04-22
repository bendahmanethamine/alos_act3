const users = require("./public/usersDB.json");
const _ = require("lodash");
const passportJWT = require("passport-jwt");
const {ExtractJwt} = require("passport-jwt");
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mysecretword';
let passport = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    let user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user)
        next(null, user);
    else
        next(null, false);

});