var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var dotenv = require('dotenv').config();
var liriCommand = process.argv[2];

function myTweets(){

}
function spotifySearch(){

}
function omdbSearch(){

}




if(liriCommand === "my-tweets"){
    console.log("twitter");
} else if(liriCommand === "spotify-this-song"){
    console.log("spotify");
} else if(liriCommand === "movie-this"){
    console.log("OMDB");
} else {
    console.log("I'm sorry, I'm having trouble understanding you.")
}



