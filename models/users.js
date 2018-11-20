var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//Create user Schema here
var userSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   username: String, //Most important pieces for user authentication
   password: String, //Most important pieces for user authentication
   timestamp: Date,
   events: [
        {
            //These are the id's or list of events that the user created
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Events'
        }
       ]
   
});


userSchema.plugin(passportLocalMongoose);

//create an export your user model
module.exports = mongoose.model("User", userSchema);