const express = require('express');
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');

const router = express.Router();

// Routes 
router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
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
  
  router.get('/login',
    connectEnsureLogin.ensureLoggedOut(),
    (req, res) => res.sendFile('public/login/index.html',
    { root: __dirname })
  );
  
  router.get('/',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.sendFile('public/index.html', {root: __dirname})
  );
  
  router.get('/user',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => res.send({user: req.user})
  );

module.exports = router;