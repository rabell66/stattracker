var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  authLevel: {
    type: String,
    required: true,
    enum: ["basic", "admin"],
    default: "basic"
  },
  activities:[{
      name:{ type: String, required:true},
      statname:{ type: String, required:true},
      tracking:{ statentry: Number, type: String}
    }],
   
});

module.exports = mongoose.model("Users", userSchema);
