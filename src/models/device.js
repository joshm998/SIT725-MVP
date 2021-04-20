const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: String,
  deviceType: String,
});
  
module.exports = mongoose.model('device', DeviceSchema);
