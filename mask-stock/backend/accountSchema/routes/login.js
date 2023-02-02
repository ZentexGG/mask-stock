const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const account = require('../accountSchema')

password.use(new LocalStrategy(( user, password, done) => {
    account.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {

            return done(null, false, { msg: "Incorrect password or email" })
        }
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) {
                return done(err)
            }
            if (res) {
                return(null, user)
            }
            else {
                return(null, false, { msg: "Incorrect password or email"})
            }
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

router.get('/login', (req, res) => {
    res.render('login')
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.render("login", { error: info.msg });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect("/");
        });
    })(req, res, next);
});

module.exports = login;

