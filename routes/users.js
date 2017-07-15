var express = require("express");
var router = express.Router();
var User = require("../models/Users");
// var jwt = require("jsonwebtoken");
// var jwtConfig = require("../jwtConfig");

//Login route\\
router.post("/api/login", function(req, res) {
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

 

///See your activities\\\
router.get("/api/activities/:username", function(req, res) {
  var userName = req.params.username;
  console.log(userName);
  User.find({ username: userName })
    .then(getActivities => {
      res.send(getActivities[0].activities);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

///Create a new Activity\\\
router.post("/api/activities/:username", function(req, res) {
  let addActivity = req.body.activities;
  let newDoc = req.body;
  let username = req.params.username;
  User.findOne({ username: username }).then(foundActivities => {
    addActivity.forEach(function(activity) {
      foundActivities.activities.push(activity);
      newDoc = foundActivities;
    });
    newDoc
      .save("newDoc")
      .then(foundActivities => {
        return res.send(foundActivities);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  });
});
////Look at a single Activity\\\\
router.get("/api/activities/:username/:activityName", function(req, res) {
  let userName = req.params.username;
  let activityName = req.params.activityName;
  User.findOne({
    username: userName,
    "activities.name": activityName
  })
    .then(user => {
      if (user) {
        res.send(
          user.activities.find(e => {
            return e.name === activityName;
          })
        );
      } else res.send("That activity is not currently being tracked");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

////Updating Tracking\\\\
router.put("/api/activities/:username/:activityName/:trackdata/:date", function(
  req,
  res
) {
 
  let userName = req.params.username;
  let trackData = req.params.trackdata;
  let activityName = req.params.activityName;
  let day = req.params.date
  
  
  console.log(trackData);
  User.findOne({
    username: userName
  })
    .then(user => {
      for (i = 0; i < user.activities.length; i++) {
        if (user.activities[i].name === activityName) {
          user.activities[i].tracking.push(trackData);
          user.activities[i].updatedAt.push(day)
          var newTrackingData = user;
          newTrackingData.save("newTrackingData").then(user => {});
          res.send("Update successful");
        }
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
////Updating Stat info\\\\
router.put(
  "/api/activities/:username/:activityName/:newActivityName/:statTracker/:newStatTracker",
  function(req, res) {
    let userName = req.params.username;
    let statTracker = req.params.statTracker;
    let newStatTracker = req.params.newStatTracker;
    let activityName = req.params.activityName;
    let newActivityName = req.params.newActivityName;

    User.findOne({
      username: userName
    })
      .then(user => {
        for (i = 0; i < user.activities.length; i++) {
          if (user.activities[i].name === activityName) {
            user.activities[i].name = newActivityName || user.activities[i].name;
            user.activities[i].statname = newStatTracker || user.activities[i].statname;
            res.send(user);
          }
        }
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
);
//remove activity\\
router.delete("/api/activities/:username/:activityName", function(req, res) {
  let userName = req.params.username;
  let activityName = req.params.activityName;
  User.findOne({
    username: userName
  })
    .then(user => {
      for (i = 0; i < user.activities.length; i++) {
        if (user.activities[i].name === activityName) {
          activityid = user.activities[i].id;
          removeActivity = user.activities[i];
          user.activities.splice(i, 1);
          user.save("user").then(user => {});
          res.send("Activity removed successfully");
        }
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
