require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// to facilitate working with the log later we seperate each separate run of the program with ";;;;",
// each instance of logging with ";;;", and each logged variable with ";;". these infrequently occurring sequences
// can be used to split the log string into an array of arrays
fs.appendFile("log.txt", ";;;", function(err) {
  if (err) {
    console.log("loging error: ", err);
  }
});

// this function conveniently records a .txt log of processes and results while logging information to the console.
function log(x, y) {
  console.log(x + " " + y);
  fs.appendFile("log.txt", ";;; " + x + ";;" + y, function(err) {
    if (err) {
      console.log("loging error: ", err);
    }
  });
}

// user command line input is parsed
let command = process.argv[2];
let argument = process.argv.slice(3).join(" ");

// I encapsulate the switch-case logic for the purpose of calling it again later within the doIt() and inquire() subroutines
execute(command, argument);
function execute(command, argument) {
  log(command, argument);
  switch (command) {
    case "concert-this":
      bands(argument);
      break;
    case "spotify-this-song":
      spotifry(argument);
      break;
    case "movie-this":
      omdb(argument);
      break;
    case "do-what-it-says":
      doIt();
      break;
    default:
      inquire();
      break;
  }
}
// HEY-still need to do spotify

// this function reads the random.txt file, then parses it, and based on the contents it will call other functions with arguments
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // we should notify the user of errors
    if (error) {
      return console.log("random read error " + error);
    }
    // we split the random file into a command and an argument
    let random = data.split(",");
    let command = random[0];
    let argument = random[1];
    // here we have to circumevent the practical joker who overwrites "do-what-it-says" to random.txt in order to protect the integrity of our call stack
    if (command == "do-what-it-says") {
      log(
        "You think you're infinitely funny, but who's laughing now? ha-HA, mwa-ha-HA."
      );
    } else {
      execute(command, argument);
    }
  });
}
// this function inquires the intent of the user, who may not be good at remembering commands
function inquire() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What can LIRI do for you?",
        choices: [
          "concert-this",
          "spotify-this-song",
          "movie-this",
          "do-what-it-says"
        ],
        name: "command"
      }
    ])
    .then(function(input) {
      let command = input.command;
      if (command == "do-what-it-says") {
        log(`Of course, LIRI is always happy to ${command}.`);
        execute(command);
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              message: `Of course, LIRI is always happy to ${command}, but which one were you referring to?`,
              name: "argument"
            }
          ])
          .then(function(input) {
            let argument = input.argument;
            execute(command, argument);
          });
      }
    });
}
// here we get the concert information from Bands in Town, using Trilogy's generously supplied app id
function bands(argument) {
  if (argument == "") {
    argument = "backstreet boys";
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        argument +
        "/events?app_id=codingbootcamp"
    )
    .then(function(concert) {
      var bit = concert.data;
      for (i = 0; i < bit.length; i++) {
        log("----------------------------------");
        log(moment(bit[i].datetime).format("MM/DD/YYYY"));
        log(bit[i].venue.name);
        log(bit[i].venue.city, bit[i].venue.region, bit[i].venue.country);
      }
      log("----------------------------------");
    })
    .catch(function(error) {
      log("Bands In Town Error: " + error);
    });
}
// this function's name is short for "SPOTIFy your queRY"
function spotifry(argument) {
  if (!argument) {
    argument = "'The Sign' Ace of Base";
  }
  spotify.search({ type: "track", query: argument, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Spotifry error occurred: " + err);
    }
    console.log("----------------------------------");
    console.log(`Artist: ` + data.tracks.items[0].artists[0].name);
    console.log(`Song Title: ` + data.tracks.items[0].name);
    console.log(`Spotify url: ` + data.tracks.items[0].external_urls.spotify);
    console.log(`Album: ` + data.tracks.items[0].album.name);
    console.log("----------------------------------");
  });
}
// this function gets the data we want from omdb
function omdb(argument) {
  if (argument == "") {
    argument = "Mr. Nobody";
  }
  argument = argument.split(" ").join("+");
  axios
    .get(`http://www.omdbapi.com/?t=${argument}&apikey=trilogy`)
    .then(function(omdb) {
      log("----------------------------------");
      log(omdb.data.Title);
      log(omdb.data.Year);
      log(
        omdb.data.Ratings[0].Source + " Rating: " + omdb.data.Ratings[0].Value
      );
      log(
        omdb.data.Ratings[1].Source + " Rating: " + omdb.data.Ratings[1].Value
      );
      log(omdb.data.Country);
      log(omdb.data.Language);
      log(omdb.data.Plot);
      log(omdb.data.Actors);
      log("----------------------------------");
    })
    .catch(function(error) {
      log("OMBDisaster:" + error);
    });
}
