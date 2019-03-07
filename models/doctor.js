var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var doctorSchema = new Schema({
  name: String,
  email:{ 
    type : String , unique : true, required : true },
  age: { 
    type: Number, min: 0, max: 100 },
  address: String,
  city: String,
  specilization:String,
  gender: String,
  file: String,
  password: String,
});
doctorSchema.plugin(uniqueValidator);

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
