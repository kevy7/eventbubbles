/***** This is our server. We're going to be using node.js as our server-side code *****/
/* ejs files will be placed in the /views folder */
/*  Do we have to type this command in all the time? "git push -u origin master"? */



var express = require("express");
var app = express(); //Now we can use functions from the express library


var faker = require("faker"); //With this, we can create fake data from the faker library


app.use(express.static("public")); //This is placed here so I can use my css or even js files. It's linking the public directory to this code


/*  This is used to retreive data from our forms */
var bodyParser = require("body-parser");
//Then, you need to write the following code below, in order to retreive data from the user via a form

app.use(bodyParser.urlencoded({extended: true}));






/*** Global Variables ***/
var usersinput = 0;







/********* "GET" requests created below **********/


//We're going to make this the home page for now, the login page should be the main page
app.get("/", function(req, res){
    
    
    /*
    Use this to generate random words
    faker.lorem.words()
    
    
    images from faker currently does not work
    
    */
    
     //generates a list of fake names and pushes it to FakeEventName array
    
    
    
    //Remember, in order to render a page using ejs, I need to install the ejs package
    res.render("index.ejs", {});
    
});


//Set a GET request to eventpage.ejs

app.get("/event/:eventname", function(req, res){
    
    var eventname = req.params.eventname;
    
    //How do I retrieve the image url form script.js?
    //How do I return, the event name?
    res.render("eventpage.ejs", {eventname: eventname});
    
});














/*********** POST requests made here ***************/


/**** This function will ask the user for the num of random events that they want to display on their page ****/
app.post("/numofevents", function(req, res){
    
    
    
});






//We need to assign our ports and ip address
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server has initiated!"); 
});








/*
What to do next?
    -find a way to redirect user to eventpage.ejs when they clicked on an event bubble
    -you need to find a way to inlcude the event name in the url
        -for example:
        
        /event/eventnamehere
        
        -This will redirect the user to the desired web page
        
        



*/