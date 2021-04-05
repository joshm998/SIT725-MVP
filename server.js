const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const connectEnsureLogin = require('connect-ensure-login');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const { userSchema} = require('./models/user');


mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
userSchema.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('User', userSchema);

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 8080;

// Setup Static Paths
app.use(
  '/materialize',
  express.static(path.join(__dirname, '/node_modules/materialize-css/dist'))
);
app.use(express.static(path.join(__dirname, '/public'), {index:false,extensions:['js', 'css']}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

// Routes 
app.post('/login', (req, res, next) => {
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

app.get('/login',
  (req, res) => res.sendFile('public/login/index.html',
  { root: __dirname })
);

app.get('/',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('public/index.html', {root: __dirname})
);

app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
);

http.listen(port, () => {
  console.log('Listening on Port ', port);
});
