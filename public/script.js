/*

This is the front-end javascript file

Using Vanilla JS

*/


/*  JS file for index.ejs  */

var eventbubbles = document.querySelectorAll(".eventbubble"); //This will select all of your event bubbles


/* I'm going to add a code below to redirect us to events.ejs file */
var eventimages = document.querySelectorAll(".Events .eventbubble .eventimage");





//Create a for loop with eventbubbles instead

// for (var a = 0; a < eventbubbles.length; a++){


//     //Find a way to pass the event titles into the addEventListener function below

//     eventbubbles[a].children[0].addEventListener("click", function(){
        
//         //No other codes work in here because this is technically a function, that makes sense!!!

//         var eventtitle = this.parentElement.children[2].outerText;
        
//         window.location.href = "https://personal-web-projects-kevy7.c9users.io/event/" + eventtitle;
        
//         /*
        
//         console.log(this.parentElement.children[2].outerText);
//         This element will return to us the title of the event.
//         How does the code above acheive this?
//             -first, we use "this" to refer to the current eventimage element
//             -.parent will return to us this child's eventubbles element
//             .children[2].outerText will give us the title of the event bubble 
            
            
//         note: "%20" is used to replace spaces within a url
        
//         */
//     });
    
    
// }


var plusButton = document.querySelector(".plusbutton");

plusButton.addEventListener("click", function(){
   
   window.location.href = "/events/new";
    
});
