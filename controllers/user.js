const AdminLogin = require("../model1/user.js");
const SignUp = require("../model1/sign_up.js");
const Employes = require("../model1/employes.js")

exports.login = (req, res, next) => {
  
  res.render('login.pug');  
}


exports.postLogin = (req, res, next) => {
  Employes.findOne({ 'user': req.body.user }, function (err, user) {
    if (err) throw err;
    console.log(user);
    if ((user != null) && (user.password == req.body.password)) {
      console.log("success");
      req.session.user = req.body.user;
      // console.log(req.session.user)
      res.redirect('/options');
    }
  })


  AdminLogin.findOne({ 'user': req.body.user }, function (err, user) {
    if (err) throw err;
    if (user.password == req.body.password) {
      console.log("success");
      req.session.user = req.body.user;
      // console.log(req.session.user)
      res.redirect('/options');
    }
  })
};

exports.options = (req, res, next) => {
  var flag = 0;
  var user = req.session.user;
  if (user == "nishanth@settlrs.com" || user == "gaurav@settlrs.com") {
    flag = 1;
  }
  if (req.session.user == undefined) {
    res.render("/login.pug");
  }
  else {
    res.render('options.pug', { flag: flag })
  }
};

exports.signup = (req, res, next) => {
  res.render('signup.pug');
}

exports.sign_up = (req, res, next) => {

  const signup = new SignUp({
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    user: req.body.user,
    password: req.body.password,
    designation: req.body.designation,
  });
  signup
    .save()
    .then(result => {
      // console.log(result);
      console.log('New User Signed Up');
      res.render('orderregistered.pug');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.newusers = (req, res, next) => {
  SignUp.find()
    .then(newusers => {
      res.render('newuser.pug', { newusers: newusers })
    })
    .catch(err => console.log(err));
};

exports.accept = (req, res, next) => {
  var ObjectID = require('mongodb').ObjectID;
  SignUp.findById({ '_id': new ObjectID(req.query.is) }, function (err, user) {
    if (err) throw err;
    console.log(user);
    var acc_user = user;
    console.log(acc_user);
    console.log(acc_user.firstname);

    const employes = new Employes({
      firstname: user.firstname,
      lastname: user.lastname,
      user: user.user,
      password: user.password,
      designation: user.designation,
    });
    employes
      .save()
      .then(result => {
        console.log('New User Signed Up');
      })
      .catch(err => {
        console.log(err);
      });

    SignUp.findByIdAndRemove(req.query.is)
      .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/newusers');
      })
      .catch(err => console.log(err));
  })
};

exports.reject = (req, res, next) => {
  SignUp.findByIdAndRemove(req.query.is)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/newusers');
    })
    .catch(err => console.log(err));
};
