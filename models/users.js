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
       ],
   comments: [
        {
            //These are the list of comments/ids of the comments that the user created
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
       
       ]
   
});


//create an export your user model
module.exports = mongoose.model("User", userSchema);