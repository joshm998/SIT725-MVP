const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  name: String,
  deviceType: String,
  ownerId: String,
  image: String,
  lat: String,
  lng: String
});
  
module.exports = mongoose.model('device', DeviceSchema);
