var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   eventName: String,
   eventImage: String,
   eventDate: Date,
   timestamp: Date,
   eventAddress: String,
   eventLocationName: String,
   eventDescription: String,
   eventParticipant: [
        {
            //List of participants/users going to this particular event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
       ],
    eventComments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ],
    createdby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
    
   
});

module.exports = mongoose.model("Events", eventSchema);