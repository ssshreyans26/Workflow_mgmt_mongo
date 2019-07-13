const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSignupSchema = new Schema({
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      user: { type: String, required: true },
      password: { type: String, required: true },
      designation : { type: String, required: true }
});

module.exports = mongoose.model('sign_up', userSignupSchema);