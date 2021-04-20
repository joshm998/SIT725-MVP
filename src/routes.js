const AuthController = require('./controllers/auth')
const DeviceController = require('./controllers/devices')

module.exports = function Routes(app) {
    // Auth Controller
    app.use('/', AuthController);
    // Device Controller
    app.use('/api/devices', DeviceController);
  };