const express = require('express');
const passport = require('passport');
const isAuthenticated = require('../helpers/authHelper')

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

router.get('/user', isAuthenticated, (req, res) =>
  res.send({ user: req.user })
);

module.exports = router;
