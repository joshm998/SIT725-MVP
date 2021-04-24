const express = require('express');
const passport = require('passport');
const isAuthenticated = require('../helpers/authHelper');
const { userSchema } = require('../models/user');
const mongo = require('../../config/mongo');

const router = express.Router();

// Routes
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect(`/login?info=${info.message}`);
    }

    req.logIn(user, () => {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
    return null;
  })(req, res, next);
});

router.get('/logout', isAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/user', isAuthenticated, (req, res) =>
  res.send({ user: req.user })
);

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  const UserDetails = mongo.model('User', userSchema);

  UserDetails.register({username, active: false}, password);
  res.redirect("/login/")

});

module.exports = router;
