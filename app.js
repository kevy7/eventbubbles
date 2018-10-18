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

var fakeeventname = [];

var fakeeventimages = [];

var FakeEventName = faker.lorem.words();



/** based on user's input, output event names and event images from faker.js **/







/********* "GET" requests created below **********/


//We're going to make this the home page for now, the login page should be the main page
app.get("/", function(req, res){
    
    
    
    /** based on the user's input, output event names and event images from faker.js **/
    
    // for (var i = 0; i <= usersinput; i++){
        
    //     fakeeventimages.push(faker.image.nightlife());
        
    // }
    
    
    
    /*
    Use this to generate random words
    faker.lorem.words()
    
    
    images from faker currently does not work
    
    */
    
    
    
    
    //Remember, in order to render a page using ejs, I need to install the ejs package
    res.render("index.ejs", {send: usersinput, FakeEventName: FakeEventName});
    
});














/*********** POST requests made here ***************/


/**** This function will ask the user for the num of random events that they want to display on their page ****/
app.post("/numofevents", function(req, res){
    
    
    /*** This "POST" request actually works! It successfully redirects us back to our page***/
    //console.log(req.body.numofuserevents);
    usersinput = req.body.numofuserevents;
    
    console.log(usersinput);
    

    
    res.redirect("/");  //redirect us back to the index.ejs when we're finished with our code
    
});






//We need to assign our ports and ip address
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Your server has initiated!"); 
});




