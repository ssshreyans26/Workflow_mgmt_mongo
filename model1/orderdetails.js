const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderdetailsSchema = new Schema({
      client: { type: String, required: true },
      vendor: { type: String, required: true },
      item: { type: String, required: true },
      quantity: { type: Number, required: true },
      expected_delivery_date:{type:String,required:true},
      property_address : { type: String, required: true },
      order_status : { type: String, required: true },
      order_id : { type: String, required: true},
      flag:{type:Boolean,required:true}

});

module.exports = mongoose.model('orderdetails', orderdetailsSchema);