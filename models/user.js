const mongoose  = require('mongoose');

exports.userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
  
exports.userDetails = mongoose.model('userInfo', this.userSchema, 'userInfo');
