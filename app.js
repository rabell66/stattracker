var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
const Users = require("./models/Users");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const port = process.env.PORT || 8000;
// var index = require("./routes/index");
var users = require("./routes/users");
// var api = require("./routes/api");
// var checkAuth = require("./middleware/checkAuth");
var app = express();
var dbUrl = "mongodb://localhost:27017/stattracker";
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade")

// connect to MongoDB
mongoose
  .connect(dbUrl)
  .then(function() {
    console.log("Connected to stattracker DB!");
  })
  .catch(function(err) {
    console.log(err);
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.user("/", index);
app.use("/", users);
// app.use("/api", checkAuth, api);




  app.listen( port, () => {
  console.log(`Server running on port ${port}`);
});



