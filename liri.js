require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// var dotenv = require('dotenv').config();
var liriCommand = process.argv[2];
var liriQuery = process.argv;
var secondQuery = "";

function myTweets(){
    client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
        if (!error) {
            for(var i = 0; i < tweets.length; i++){
            console.log( eval(i+1)+ ". ----- " + tweets[i].text);
            }
        }
    });
}

function sendTweet(){
    client.post('statuses/update', {status: secondQuery},  function(error, tweet, response) {
        if(error){} throw error;
      });
      console.log("mytweets");
}
function spotifySearch(){
    spotify.search({ type: 'track', query: secondQuery }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var info = data.tracks.items[0]

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
      console.log("ARTIST : " + info.artists[0].name); 
      console.log("SONG : " + info.name); 
      console.log("ALBUM : " + info.album.name); 
      console.log("PREVIEW THIS SONG : " + info.preview_url);
      });
}
function omdbSearch(){
    request("http://www.omdbapi.com/?t=" + secondQuery +"&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("MOVIE TITLE : " + info.Title);
          console.log("STARRING CAST : " + info.Actors);
          console.log("RELEASED : " + info.Year);
          console.log("IMDB : " + info.imdbRating);
          console.log("ROTTEN TOMATOES : " + info.Ratings[1].Value);
          console.log("COUNTRY OF ORIGIN : " + info.Country);
          console.log("LANGUAGE(S) : " + info.Language);
          console.log("PLOT : " + info.Plot);


          
        }
      });
}

inquirer.prompt([
    {
    type : "list",
    message : "Hey Liri,",
    choices : ["my-tweets", "new-tweet", "spotify-this-song","movie-this"],
    name: "liriCommand"
    },{
    when: function(response){return response.liriCommand === "new-tweet";},
    type : "input",
    message : "What to you want to share with the world?",
    name: "secondQuery"
    },{
    when: function(response){return response.liriCommand === "spotify-this-song";},
    type : "input",
    message : "Which song?",
    name: "secondQuery"
    },{
    when: function(response){return response.liriCommand === "movie-this";},
    type : "input",
    message : "Which movie?",
    name: "secondQuery"
    }
    


]).then(function(response) {
    liriCommand = response.liriCommand;
    if(liriCommand === "my-tweets"){
        myTweets();
    } else if(liriCommand === "new-tweet"){
        secondQuery = response.secondQuery;
        sendTweet();
    } else if(liriCommand === "spotify-this-song"){
        secondQuery = response.secondQuery;
        spotifySearch();
    } else if(liriCommand === "movie-this"){
        secondQuery = response.secondQuery;
        omdbSearch();
    } else {
        console.log("I'm sorry, I'm having trouble understanding you.")
    }

    
});







// if(liriCommand === "my-tweets"){
//     myTweets();
// } else if(liriCommand === "new-tweet"){
//     sendTweet();
// } else if(liriCommand === "spotify-this-song"){
//     spotifySearch();
// } else if(liriCommand === "movie-this"){
//     omdbSearch();
// } else {
//     console.log("I'm sorry, I'm having trouble understanding you.")
// }



