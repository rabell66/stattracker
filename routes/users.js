var express = require("express");
var router = express.Router();
var User = require("../models/Users");
// var jwt = require("jsonwebtoken");
// var jwtConfig = require("../jwtConfig");



router.post("/activities",function(req, res){
   let activityData = req.body;
  let newActivity = new User(activityData);
  console.log("newActivity: ", newActivity);
  newActivity
    .save()
    .then(newActivity => {
      res.send(newActivity);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});





module.exports = router