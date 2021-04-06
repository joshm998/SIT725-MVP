const mongoose = require('mongoose');

const {Schema} = mongoose;

exports.userSchema = new Schema({
  username: String,
  password: String,
});
  
exports.userDetails = mongoose.model('userInfo', this.userSchema);
