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


/* packages installed for passport - user authentication */
/*
    packages we need to install for user authentication
        passport-local
        passport-local-mongoose
        express-session
        passport

*/
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");




/*** Require database models here ***/
var User = require("./models/users"); //User is already required here to be used for passport authentication
var Events = require("./models/events");
var Comments = require("./models/comments");
var eventAddress = require("./models/eventAdress");


/*** codes below are related to authentication and needed in order to use them ***/
app.use(require("express-session")({
    secret: "These are secret events",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method")); //we're telling methodOverride to find _method





/*** Global Variables ***/
var usersinput = 0;



/***********
 * 
 * Middleware for routes are placed in here
 * 
 * ********/
 
 //This function below will check if the user is still logged in or not
 
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login"); //If the user is not authenticated, then redirect them back to the login page
 }
 
 //This function below will be called and will pass the current loggedin user to each route
 app.use(function(req, res, next){
     res.locals.currentUser = req.user;
     next();
 }); //With this code, the current logged in user will be passed on to every route


//The function below will check if the current user's id that's logged in matches the user_id belonging to an event
//Creating my own personal middleware below, read and try to understand how middleware works
//The code below should now be used as our middleware

//WORK ON THIS - this code should be correct
function authorizeEvent(req, res, next){
    
    var eventID = req.params.id;
    
    //first authenticate the current user that's logged in
    if(req.isAuthenticated()){
        //If user is authenticated, then find the event that they're trying to edit, update, or remove
        Events.findById(eventID, function(err, event) {
            
            if(err){
                res.redirect("back");
            }
            else {
                
                //write an if statement here, only render page if the user's id matches with the user id from the event
                
                if(req.user._id.equals(event.createdby)){
                    //res.render("eventpageEDIT.ejs", {event: event
                    
                    //do i need to include next() for this?
                    next();
                }
                else {
                    res.send("You don't have permission to do that");
                }
            }
        
        
        });
    }
    else {
        res.redirect("back");
    }
    
}











/********
 * 
 * Routes for login, register form, along with logout request
 * 
 * *****/

app.get("/register", function(req, res) {
    res.render("register.ejs"); //This will take us to the register page
});

app.post("/register", function(req, res) {
    //We want to create a User.register here
   
    //This will give us the username
    //req.body.user
    
    
    //We want to register the new user into the database below
    var newUser = new User(
        {
            username: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            timestamp: new Date()
        
        }); //This will pass in the user for us into the database
    
    User.register(newUser, req.body.password, function(err, user){
        
        if(err){
            console.log(err);
        }
        //Istead of an If statement here, we want to authnenticate the user if there aren't any errors
        //use passport.authenticate
        passport.authenticate("local")(req, res, function(){
           res.redirect("/events"); 
        });
        
    } );
    
    
});

// ROUTE for login page
//

app.get("/login", function(req, res){
    res.render("login.ejs");
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/events",
        failureRedirect: "login"
        //This is a middleware, if the login fails, redirect the user to the login page
    }),
    function(req, res){
        //We can put nothing in here for now
    
});

//ROUTE for logout request below
app.get("/logout", function(req, res){
   req.logout(); //This function will simply log us out for us
   res.redirect("/");
});



/********
 * 
 * Editing an event GET and PUT routes
 * 
 * 
 * 
 * *****/


//route for EDITing and event
// /events/:id/edit
// this will take us to the edit page for an event
// REMEMBER to pass isLoggedIn as an argument
app.get("/events/:id/edit", authorizeEvent, function(req, res) {
    
    var eventID = req.params.id;
    //console.log(eventID);
    
    //console.log(eventID);
    
    Events.findById(eventID).populate("eventAddress").exec(function(err, event) {
        if(err){
            console.log(err);
        }
        else {
            res.render("eventpageEDIT.ejs", {event: event} );
            //console.log(event.eventAddress[0].eventStreetAddress);
        }
    });
});


//ROUTE for PUT request, to make edit and changes to an event 
//Update EVENT based on user's changes.
//Need to install method-override for PUT request
app.put("/events/:id", authorizeEvent, function(req, res){
    
    //console.log("PUT request should've been made");
    
    //Try to use findbyandupdate here
    //console.log(req.params.id);
    
    
    
    
    
    //example to populate adress
    //Events.findById(eventID).populate("eventComments").populate("createdby").exec(function(err, event){
    
    
    Events.findById(req.params.id).populate("eventAddress").exec(function(err, event){
        if(err){
            console.log(err);
        }
        else {
            //Event is placed to be used in here
            //create an update function here, to update the event that is within the database
            
            event.eventName = req.body.eventName;
            event.eventImage = req.body.eventImage;
            event.eventDate = req.body.eventDate;
            event.eventDescription = req.body.eventDescription;
            
            //Updating the event's address
            //Resolve this: I accidently made my database to collect an array of eventaddresses. An event should only have one eventAddress
            event.eventAddress[0].eventStreetAddress = req.body.streetAddress;
            event.eventAddress[0].eventCity = req.body.eventCity;
            event.eventAddress[0].eventState = req.body.eventState;
            event.eventAddress[0].eventZipCode = req.body.eventZipCode;
            
            event.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Succesfully updated the Event in the database");
                    event.eventAddress[0].save(function(err){
                       if(err){
                           console.log(err);
                       } 
                       else{
                            console.log("succesfully updated the address in the database");
                            res.redirect("/events");
                       }
                    });
                    
                }
            })
        }
    });
    
    
    //Try to use findbyandupdate here
    
    
});





//DELETE route
//This route is responsible for deleting a user's created event. Only the user who created the event should be able to delete it.

app.delete("/events/:id/delete", authorizeEvent, function(req, res){
    
    
    //Find the current event within the database first
    Events.findById(req.params.id).populate("eventAddress").exec(function(err, event){
        if(err){
            console.log(err);
        }
        else{
            eventAddress.findOneAndRemove({_id: event.eventAddress[0]._id}, function(err){
                if(err){
                    console.log(err);
                }
                else {
                    //event address was removed here
                    console.log("The address was removed - first");
                    Events.findOneAndRemove({ _id: event._id}, function(err){
        
                    if(err){
                        console.log(err);
                        }
                    else {
                        //remove the event here
                            console.log("The event was removed - final");
                            res.redirect("/events");
                        }
                    });
                    
                    
                }
            });
        }
    });
    
    
});















/********* "GET" requests created below **********/

app.get("/", function(req, res){
   
   res.send("This is a temporary landing page for now"); 
    
});



//User has to be logged in, in order to see this page
//We're going to make this the home page for now, the login page should be the main page
app.get("/events", isLoggedIn, function(req, res){
    
    
    
    //Write a query to get event data from my database
    //Retreive all events from my database
    
    
    //UPDATE: Now, we need to find all events where the user id is the current user that's logged in
    //req.user will output us the current user that's logged in
    
    
    //used to find all events created by the current user that's logged in
    //createdby: req.user._id
    
    //Find all events created by the current user that's currently logged in
    Events.find({}, function(err, events){
       if (err){
           console.log(err);
       } 
       else {
            //console.log(events);//Outputs an array with a list of all event objects
           
           
           //Remember, in order to render a page using ejs, I need to install the ejs package
            res.render("index.ejs", {events:events});
       }
    }); //There are currently three created events in the database
    
    
    
});



//Get request to the event creation page
app.get("/events/new", isLoggedIn, function(req, res){
    
   res.render("newEvent.ejs");
   //This page contains the form that will be a post request used to enter information into our database
   
});





//Set a GET request to eventpage.ejs

app.get("/events/:id", isLoggedIn, function(req, res){
    
    var eventID = req.params.id;
    
    //How do I retrieve the image url form script.js?
    //How do I return, the event name?
    
    
    //This will populate our comments for us so that we can have access to them rather than having access to their id's
    Events.findById(eventID).populate("eventComments").populate("createdby").exec(function(err, event){
    //we also populated createdby so that we can retreive the user that created the event
    
    //Events.findById(eventID, function(err, event){
       if(err){
           console.log(err);
       } 
       else{
           
           //Refer to this code
           //User.findOne({email: "email@email.com"}).populate("posts").exec(function(err, user){
           
           /*** Find an address based on it's ID here ***/
           eventAddress.findById(event.eventAddress, function(err, address){
               
               if(err){
                   console.log(err);
               }
               else{
                   
                   
                   
                   
                   
                   res.render("eventpage.ejs", {event: event, address: address});
                   
                   //Find a way to also retreive an event's list of comments as well and pass
                   //that to the user
                   
               }
               
           });
       }
    });
    
    
});












/*********** POST requests made here ***************/




/**** This function will ask the user for the num of random events that they want to display on their page ****/
app.post("/events", isLoggedIn, function(req, res){
    
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
         timestamp: new Date(),
         eventDescription: req.body.eventDescription,
         createdby: req.user._id
         
        
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




//Post request for entering comments into a specific event

app.post("/events/:id/comment", isLoggedIn, function(req, res){
    
    var eventID = req.params.id; //Getting our event id
    var comment = {
        comment: req.body.userComment,
        timestamp: new Date(),
        commentCreatedBy: req.user._id,
        username: req.user.username
    };
    
    
    //Find an event based on it's id and then push a newly created comment into that event
    
    //Create the comment first, then push the comment into the event
    Comments.create(comment, function(err, comment){
       if (err){
           console.log(err);
       } 
       else {
           Events.findById(eventID, function(err, event){
              if (err){
                  console.log(err);
              } 
              else {
                  console.log(event);
                  
                  event.eventComments.push(comment);
                  
                  event.save(function(err, data){
                     if(err){
                         console.log(err);
                     } 
                     else {
                         console.log(data);
                         //returns the data, which is the comment and event
                         
                     }
                  });
              }
           });
           
       }
    });
    
    
    
    
    //res.send(req.body.userComment);
    
    res.redirect("/events/" + eventID);
    
});






//We need to assign our ports and ip address
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server has initiated!"); 
});
//By using process.env.PORT it is defualted to port 8080







/*
What to do next?
    -find a way to redirect user to eventpage.ejs when they clicked on an event bubble
    -you need to find a way to inlcude the event name in the url
        -for example:
        
        /event/eventnamehere
        
        -This will redirect the user to the desired web page
    
    
    
    
    now that I can enter events into my database, I need to figure a way to display all of the events that are stored within my database
    
        
        
        Find out, how to pass user data in when creating a comment or an event.
            -Associating events and comments with a user


WORK ON THIS!!!!!
    figure out how to associate a user with the comment that they created on an event post
    

*/