var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  address: String,
  city: String,
  specilization:String,
  gender: String,
  file: String,
  password: String,
});
var doctor = mongoose.model('doctor', doctorSchema);
module.exports = doctor;
