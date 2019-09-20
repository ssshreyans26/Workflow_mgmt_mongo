var express = require('express')
var http = require('http')
var app = express();
var mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
const path = require('path');
const FileSync = require("lowdb/adapters/FileSync");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!" }));
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var server = http.createServer(app)
const bodyParser = require('body-parser');
var mongo = require('mongodb');
var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!" }));
var cookieParser = require("cookie-parser");
app.use(cookieParser());


app.use(bodyParser.json()); //to use a function inside the node app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,"images")));



//PORT
const port = 8000
const alert = require("alert-node");
// Routes
const userRoutes = require('./routes/user_route');
app.use(userRoutes);
const orderRoutes = require('./routes/order_route');
app.use(orderRoutes);


//PORT
app.set('port', process.env.PORT || 8000);
app.set('host', process.env.HOST || '0.0.0.0');
//app.set('host', process.env.HOST || '127.0.0.1');

server.listen(app.get('port'), app.get('host'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// server.listen(8000, '18.218.246.126')


mongoose
  .connect(
 'mongodb://workflowmgmt:WorkflowmgmT1!@localhost:27017/workflow_mgmt'
// 'mongodb://localhost:27017/workflow_mgmt'
  )
  .then(result => {
    console.log("Mongodb connection made.")
  })
  .catch(err => {
    console.log(err);
  });
