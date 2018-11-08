var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   eventName: String,
   eventImage: String,
   eventDate: Date,
   timestamp: Date,
   eventAddress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'eventAdddress'
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
                ref: 'Comments',
                commentCreatedBy: {
                    
                    //The user that created this comment
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            }
        ],
    createdby: {
        
            //The user that created this event
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    }
    
   
});

module.exports = mongoose.model("Events", eventSchema);