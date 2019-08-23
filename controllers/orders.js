const AdminLogin = require("../model1/user.js");
const SignUp = require("../model1/sign_up.js");
const Employes = require("../model1/employes.js")
const OrderDetails = require("../model1/orderdetails.js")
const Supply_Mgmt = require("../model1/supply_mgmt.js")


exports.neworders = (req, res, next) => {
  if (req.session.user == undefined) {
    res.render('login.pug');
  }
  else {
    res.render('neworders.pug');
  }
}

exports.delivered = (req, res, next) => {
  if (req.session.user == undefined) {
    res.render('login.pug');
  }
  else {
    var delivered_orders = [];
    Supply_Mgmt.find()
      .then(del => {
        OrderDetails.find({ $or: [{ order_status: "PARTIALLY_PENDING" }, { order_status: "DELIVERED" }] }, function (err, user) {
          // console.log(del);
          // console.log(user);
          var collection = []
          res.render('delivered.pug', { del: del, user: user });
        });
      })
      .catch(err => console.log(err));
    console.log(delivered_orders);
  }
};


exports.pendingorders = (req, res, next) => {
  if (req.session.user == undefined) {
    res.render('login.pug');
  }
  else {
    OrderDetails.find()
      .then(orderdetails => {
        res.render('pendingorders.pug', { orderdetails: orderdetails })
      })
      .catch(err => console.log(err));
  }
};

exports.deleteorders = (req, res, next) => {
  if (req.session.user == undefined) {
    res.render('login.pug');
  }
  else {
    OrderDetails.find()
      .then(orderdetails => {
        res.render('delete_orders.pug', { orderdetails: orderdetails })
      })
      .catch(err => console.log(err));
  }
};

exports.new_orders = (req, res, next) => {
  var uniqid = require('uniqid');
  var dateTime = require('node-datetime');
  var id = uniqid();
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log(req.body.date)

  const order = new OrderDetails({
    client: req.body.CLIENT,
    vendor: req.body.VENDOR,
    item: req.body.ITEM,
    expected_delivery_date: req.body.date,
    quantity: req.body.QUANTITY,
    property_address: req.body.ADDRESS,
    order_status: "PENDING",
    order_id: id,
    flag:false
  });
  order
    .save()
    .then(result => {
      // console.log(result);
      console.log('New Order Registered');
    })
    .catch(err => {
      console.log(err);
    });
  const supply_mgmt = new Supply_Mgmt({
    order_id: id,
    registered_by: req.session.user,
    registered_on: formatted,
    flag:false
  });
  supply_mgmt
    .save()
    .then(result => {
      // console.log(result);
      console.log('New Order ID Registered');
      res.render('orderregistered.pug');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.update = (req, res, next) => {
  console.log("inside order update");
  var uniqid = require('uniqid');
  var dateTime = require('node-datetime');
  var id = uniqid();
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  var o_id = req.body.str;
  var date_of_delivery = req.body.date_of_delivery;
  

  var qty = parseInt(req.body.qty)
  var delivery_details = { "date": formatted,"date_of_delivery":date_of_delivery, "user": req.session.user, "qty": qty, d_id: id }
  OrderDetails.findOne({ order_id: o_id }, function (err, user) {
    if (user.quantity > qty) {
      user.quantity = user.quantity - qty;
      user.order_status = "PARTIALLY_PENDING"
      Supply_Mgmt.findOneAndUpdate({ order_id: o_id }, { $push: { delivery_details: delivery_details } }, function (err, user) {
      });
      user.save();
    }
    else if (user.quantity == qty) {
      user.quantity = user.quantity - qty;
      user.order_status = "DELIVERED"
      Supply_Mgmt.findOneAndUpdate({ order_id: o_id }, { $push: { delivery_details: delivery_details } }, function (err, user) {
      });
      user.save();
    }
  });
  res.render("orderregistered.pug");
}



exports.error_update = (req, res, next) => {
  var qty = parseInt(req.body.qty);
  var order_id = req.body.data;
  var d_id = req.body.did;
  var oqty = parseInt(req.body.oqty);
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log("inside error update")
  console.log(qty + ":" + order_id + ":" + d_id + ":" + oqty);

  OrderDetails.findOne({ order_id: order_id }, function (err, pen) {
    var total_qty = pen.quantity + oqty;
    if (total_qty > qty) {
      Supply_Mgmt.findOne({ order_id: order_id }, function (err, user) {
        var length = user.delivery_details.length;
        console.log(user.delivery_details);
        for (i = 0; i < length; i++) {
          console.log("inside for loop")
          if (user.delivery_details[i].d_id == d_id) {
            console.log("inside if else")
            user.delivery_details[i].qty = qty;
            user.delivery_details[i].user = req.session.user;
            user.delivery_details[i].date = formatted;
          }
        }
        user.save();
      });
      pen.quantity = total_qty - qty;
    }
    pen.save();
  });
}

exports.delete_update = (req, res, next) => {
  console.log(req.body.data)
  var id = req.body.data;
  OrderDetails.findOne({ order_id: id }, function (err, user) {
    console.log(user.flag)
    user.flag = true;
    user.save();
    }
  );
  Supply_Mgmt.findOne({ order_id: id }, function (err, sup) {
    console.log(sup.flag)
    sup.flag = true;
    sup.save();
  });
}