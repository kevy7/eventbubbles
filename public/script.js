/*

This is the front-end javascript file

*/

/* our js code works! */

/*  JS file for index.ejs  */

var eventbubbles = document.querySelectorAll(".eventbubble"); //This will select all of your event bubbles


/* I'm going to add a code below to redirect us to events.ejs file */
var eventimages = document.querySelectorAll(".Events .eventbubble .eventimage");



//Testing out, we're going to be returning the child elements f eventbubbles
//console.log(eventbubbles[0].children[2].outerText); //this code is used to retrieve the title of your events

console.log(eventbubbles[0].children[0]);
console.log(eventimages[0]);





//Create a for loop with eventbubbles instead

for (var a = 0; a < eventbubbles.length; a++){
    
// console.log(eventbubbles[0].children[0]);
// console.log(eventimages[0]);

    var eventendpath = console.log(eventbubbles[a].children[2].outerText);

    //Find a way to pass the event titles into the addEventListener function below

    eventbubbles[a].children[0].addEventListener("click", function(){
        
        //No other codes work in here because this is technically a function, that makes sense!!!
        
        //console.log(eventbubbles[0].children[2].outerText);
        window.location.href = "https://personal-web-projects-kevy7.c9users.io/event/" + "name";
        
        //"this" will refer to the current eventbubble
        //There is a way to revert and get information from the parent element
        
    });
    
    
}