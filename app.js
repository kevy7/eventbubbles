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
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reference_demo", {
    useNewUrlParser:true
});


/*** Require database models here ***/
var User = require("./models/users");
var Events = require("./models/events");
var Comments = require("./models/comments");
var eventAddress = require("./models/eventAdress");






/*** Global Variables ***/
var usersinput = 0;







/********* "GET" requests created below **********/

app.get("/", function(req, res){
   
   res.send("This is a temporary landing page for now"); 
    
});



//We're going to make this the home page for now, the login page should be the main page
app.get("/events", function(req, res){
    
    
    
    //Write a query to get event data from my database
    //Retreive all events from my database
    
    Events.find({}, function(err, event){
       if (err){
           console.log(err);
       } 
       else {
            console.log(event);//Outputs an array with a list of all event objects
           
           //Remember, in order to render a page using ejs, I need to install the ejs package
            res.render("index.ejs", event);
       }
    }); //There are currently three created events in the database
    
    
    
    
    
});



//Get request to the event creation page
app.get("/events/new", function(req, res){
    
   res.render("newEvent.ejs");
   //This page contains the form that will be a post request used to enter information into our database
   
});





//Set a GET request to eventpage.ejs

app.get("/event/:id", function(req, res){
    
    //var eventname = req.params.eventname;
    
    //How do I retrieve the image url form script.js?
    //How do I return, the event name?
    //res.render("eventpage.ejs", {eventname: eventname});
    
});














/*********** POST requests made here ***************/




/**** This function will ask the user for the num of random events that they want to display on their page ****/
app.post("/events", function(req, res){
    
    //This is a post request to add an event into a database
    //first, you need to install body-parser in order to retreive data from your forms
    
    
    var addressData = {
        
        eventStreetAddress: req.body.streetAddress,
        eventCity: req.body.eventCity,
        eventState: req.body.eventState,
        eventZipCode: req.body.eventZipCode
        
          
    };//This needs to be pushed into the database
    
    
    var eventData = {
        
         eventName: req.body.eventName,
         eventImage: req.body.eventImage,
         eventDate: req.body.eventDate,
         eventDescription: req.body.eventDescription,
         
        
    };
    
    
    // console.log(eventData);
    // console.log(addressData);
    
    
    
    
    //Enter adddress into the database and then place that address into the newly entered event
    eventAddress.create(addressData, function(err, address){
       if(err){
           console.log("There was an error entering the address into the database. Dang it!!");
       } 
       else {
           //Else, the address was succusfully pushed into the database
           console.log(address);
           
           Events.create(eventData, function(err, event){
              if (err){
                  console.log(err);
              } 
              else {
                  
                  
                  //console.log(event);
                  //This should already created the event
                  //We're going to push the address id into our event
                  event.eventAddress.push(address);
                  
                  event.save(function(err, data){
                     if(err){
                         console.log(err);
                     } 
                     else {
                         console.log(data);
                     }
                  });
                  
                  
                  
                  
              }
           });
           
       }
    });
    
    
    res.redirect("/events/new");
    
    
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
    
    
    
    
    now that I can enter events into my database, I need to figure a way to display all of the events that are stored within my database
    
        



*/