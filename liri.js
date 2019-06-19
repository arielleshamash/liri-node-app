require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

//moment.js
var moment = require("moment");
moment().format();

var spotify = new Spotify(keys.spotify);
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

//find concerts based on user inputs
function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp#";

    request(queryURL, function (error, response, body) {
        //if there is no error
        if (!error && response.statusCode === 200) {
            //JSON format band info
            var userBand = JSON.parse(body);
            //loop through data
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log("Artist: " + userBand[i].lineup[0] + "\nVenue: " + userBand[i].venue.name + "\nCity: " + userBand[i].venue.city);

                    //moment.js format the date and time of the concert
                    var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log("Date and time: " + concertDate);
                };
            } else {
                //if no results were found
                console.log("No concerts found for this band!");
            };
        };
    });

};

function spotifyThisSong() {
    //if no search input, default to ace of base
    if (!userInput) {
        userInput = "the sign ace of base"
    };

    spotify.search({
        type: "track",
        query: userInput,
        limit: 3
    }, function (error, data) {
        if (error) {
            console.log("Error: " + error);
        }else {

            var spotifyArr = data.tracks.items;
            for (i=0; i < spotifyArr.length; i++) {

            //display spotify results
            var spotifyResult = data.tracks.items[i];
            console.log("Artist: " + spotifyResult.artists[0].name + "\nSong: " + spotifyResult.name + "\nLink: " + spotifyResult.external_urls.spotify + "\nAlbum: " + spotifyResult.album.name);
            };
        };
    });
};

function movieThis() {
    //if no user input default to Mr. Nobody
    if (!userInput) {
        userInput = "Mr. Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {

        //if there is no error show results
        if (!error && response.statusCode === 200) {
            var movieSearch = JSON.parse(body);
            console.log("Movie Title: " + movieSearch.Title + "\nYear: " + movieSearch.Year + "\nIMBD Rating: " + movieSearch.imdbRating + "\nRotten Tomatoes Rating: " + movieSearch.Ratings[1].Value + "\nCountry: " + movieSearch.Country + "\nLanguage: " + movieSearch.Language + "\nPlot: " + movieSearch.Plot + "\nMain Actors: " + movieSearch.Actors)
        };
    });
};



function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArray = data.split(",");

        command = dataArray[0];
        userInput = dataArray[1];
    });
};

function inputCommands(command, userInput) {
    switch (command) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays(userInput);
            break;
        default:
            console.log("I don't understand");
            break;    
    };
};

inputCommands(command, userInput);
