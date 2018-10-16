/***** This is our server. We're going to be using node.js as our server-side code *****/
/* ejs files will be placed in the /views folder */
/*  Do we have to type this command in all the time? "git push -u origin master"? */



var express = require("express");
var app = express(); //Now we can use functions from the express library
app.use(express.static("public"));

var faker = require("faker"); //With this, we can create fake data from the faker library


/********* "GET" requests created below **********/


//We're going to make this the home page for now, the login page should be the main page
app.get("/", function(req, res){
    
   res.render("index"); 
    
});







//We need to assign our ports and ip address
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server has initiated!"); 
});