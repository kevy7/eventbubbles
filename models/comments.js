var mongoose = require("mongoose");

//Create a schema here
var commentSchema = new mongoose.Schema({
   comment: String,
   timestamp: Date
});

//I don't even know if this schema is even needed

module.exports = mongoose.model("Comments", commentSchema);