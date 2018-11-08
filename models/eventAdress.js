var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
   
   eventStreetAddress: String,
   eventCity: String,
   eventState: String,
   eventZipCode: Number
   
});


module.exports = mongoose.model("eventAddress", addressSchema);