const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminLoginSchema = new Schema({
      user: { type: String, required: true },
      password: { type: String, required: true },
      designation : { type: String, required: true }

});

module.exports = mongoose.model('admin_login', adminLoginSchema);
