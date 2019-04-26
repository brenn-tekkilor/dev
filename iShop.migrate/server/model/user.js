var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// create a schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
}, { collection: 'user' });
 
exports.userSchema = userSchema;
