var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var patientSchema = new Schema({
  name: String,
  email:{
     type : String , unique : true, required : true },
  age:{ 
    type: Number, min: 0, max: 100 },
  address: String,
  city: String,
  gender: String,
  file: String,
  password: String,

});
patientSchema.plugin(uniqueValidator);

patientSchema.methods.validPassword = function (password) {
  if (this.password == password) {
    return true;
  }
  else {
    return false;
  }
}
var patient = mongoose.model('patient', patientSchema);
module.exports = patient;

