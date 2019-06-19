require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

//moment.js
var moment = require("moment");
moment().format();

var spotify = new spotify(keys.spotify);
var omdb = new omdb(keys.omdb);
var bandsintown = new bandsintown(keys.bandsintown);

var userInput = process.argv[2];
var userQuery = process.argv[3];

//find concerts based on user inputs
function concertThis(band) {
    var queryURL = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp#";

    request(queryURL, function (error, response, body) {
        //if there is no error
        if (!error && response.statusCode === 200) {
            //JSON format band info
            var userBand = JSON.parse(body);
            //loop through data
            if (userBand.length > 0) {
                for (i = 0; i < 1; i++) {
                    console.log("Artist: " + userBand[i].lineup[0] + "/nVenue: " + userBand[i].venue.name + "/nCity: " + userBand[i].venue.city);

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

function spotifyThis(music) {
    //if no search input, default to ace of base
    if (!userQuery) {
        userQuery = "the sign ace of base"
    };

};

