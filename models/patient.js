var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  address: String,
  city: String,
  gender: String,
  file: String,
  password: String,
});
var patient = mongoose.model('patient', patientSchema);
module.exports = patient;
