var mongoose = require("mongoose");

//Create user Schema here
var userSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   timestamp: Date,
   events: [
        {
            //These are the id's or list of events that the user created
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Events'
        }
       ]
   
});


//create an export your user model
module.exports = mongoose.model("User", userSchema);