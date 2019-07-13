const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supply_mgmtSchema = new Schema({
      order_id : { type: String, required: false},
      registered_by : {type: String, required: false},
      registered_on : {type: Date, required: false},
      flag:{type:Boolean,required:true},
      delivery_details : [ {
          date : {type: String, required: false},
          user : {type: String, required:false},
          qty  : {type: Number, required: false},
          d_id : {type: String, required: false}
      
        }
    ]
});

module.exports = mongoose.model('supply_mgmt', supply_mgmtSchema);