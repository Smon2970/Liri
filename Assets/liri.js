
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var fs = require("fs");
var request = require("request");
var twitter = require("twitter");

var env = require("dotenv").config();

var action = process.argv[2];

switch (action) {
case "my-tweets":
    tweets();
    break;

case "spotify-this-song":
    spotifys();
    break;

case "movie-this":
    movies();
    break;

case "do-what-it-says":
    command();
    break;
}

function tweets() {
    
    var argument = new twitter({
    consumer_key: 'imgQZC1AbRGiJZuOkF32rVVAz',
    consumer_secret:'agdr1WSX9KVWUobpMKF8cRmnZicxMeRf3lz8tsgyvEu9jut0xM',
    access_token_key: '1009695235444760577-pDrNtxZ9YFfTOKntGB2rQSTf2lIh9q' ,
    access_token_secret: 'HtzmVcmZeMpL7Q1S9XsFOFo94bEOHN1Lm3PTpVEp3qek4',

  });

    var params = {
        screen_name: '@Selena87099109',
		count: 20
    };

    argument.get('statuses/user_timeline/', params, function(error, tweets) {
       
        if(error) { 
			console.log('Error: ' + error);
		} else { 
	  	console.log("20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
    })
};

function spotifys(musicList){

    var spotify = require("node-spotify-api");

    if(musicList === undefined)
    musicList = "the sign ace of base";

    var song = new spotify({
        id:"c6d3d01775fe4dc094761109830b1671" ,
        secret: "af79d91eb5d2485baac2709a339e7a98"
   });

   var command = process.argv[3]

   song.search({ type: 'track', query: command}, function(err, data) {
        if(err) {
            console.log('Error occurred: ' + err);
        } else { 
                for(var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if(i === 0) {
                        console.log("Artist: " + data.tracks.items[0].artists[i].name);
                    }
                   }  
            }
            console.log("Song:  " + data.tracks.items[0].name);
            console.log("Preview it: " + data.tracks.items[0].preview_url);
            console.log("Album:  " + data.tracks.items[0].album.name);
    })
};

function movies(){
    var movieName = process.argv[3];
    var request = require('request');

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
                    
            if(error){
                console.log('error:', error);
            } 
        
                var movie = JSON.parse(body);

                console.log("Title: " + movie.Title);
                console.log("Release Year: " + movie.Year);
                console.log("Rating: " + movie.imdbRating);
                console.log("Actors: " + movie.Actors);
                console.log("Rotten Tomatoes:  " + movie.rottenTomatoes);
                console.log("Country:  " + movie.Country);
                console.log("Language:  " + movie.Language);
                console.log("Plot:  " + movie.Plot);
                console.log("Actors:  " + movie.Actors);
    });
}

function command(){

    fs.readFile("random.txt", "utf-8", function(error, data) {

        if (error) {
            return console.log(error);
          }

          console.log(data);
          //break object 

          data.split(" ,")
        //   var newsongtitle = command
        //   //grab song name 
        //   // run sportifys 
        //     process.argv[3] = newsongtitle

        //     console.log(newsongtitle)

    });
}