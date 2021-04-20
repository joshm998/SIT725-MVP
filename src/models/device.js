const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: String,
  deviceType: String,
  ownerId: String
});
  
module.exports = mongoose.model('device', DeviceSchema);
