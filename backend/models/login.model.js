const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash:{type: String, required:true, unique: false},
  createdAt: { type: Date, default: Date.now }
});

loginSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

loginSchema.set('toJSON', {
  virtuals: true,
});
const User = mongoose.model('Login', loginSchema);
module.exports=User;

