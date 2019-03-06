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

doctorSchema.methods.validPassword = function( password){
  if (this.password == password) {
    return true;
  }
  else {
    return falsae;
  }
}
  
var doctor = mongoose.model('doctor', doctorSchema);
module.exports = doctor;
