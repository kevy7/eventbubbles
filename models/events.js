var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   eventName: String,
   eventImage: String,
   eventDate: Date,
   timestamp: Date,
   eventAddress:
        [
            {
                
                //Issue with my database: This shouldn't be an array of addresses
            type: mongoose.Schema.Types.ObjectId,
            ref: 'eventAddress'
            }
        ],
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
                //List of comments that were posted into this event
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ],
    createdby: {
        
            //The user that created this event
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
    
   
});

module.exports = mongoose.model("Events", eventSchema);