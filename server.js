const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const { userSchema} = require('./src/models/user');
require('dotenv').config()


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
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

require('./src/routes')(app);

http.listen(port, () => {
  console.log('Listening on Port ', port);
});
