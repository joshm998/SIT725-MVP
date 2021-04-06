const AuthController = require('./controllers/auth')

module.exports = function Routes(app) {
    // Auth Controller
    app.use('/', AuthController);
  };