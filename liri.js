require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const moment = require("moment");
// var spotify = new Spotify(keys.spotify);

// user command line input is parsed
let command = process.argv[2];
let argument = process.argv.slice(3).join(" ");
// *give an inquirer if no input, with conditional in the promise

// I encapsulate the switch-case logic for the purpose of calling it again later within the doIt() and default() subroutines
execute(command, argument);
function execute(command, argument) {
  switch (command) {
    case "concert-this":
      bands(argument);
      break;
    case "spotify-this-song":
      console.log("get spotifried: ", argument);
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
// still need to do spotify

// this function reads the random.txt file, then parses it, and based on the contents it will call other functions with arguments
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // we should notify the user of errors
    if (error) {
      return console.log("random read error " + error);
    }
    let random = data.split(",");
    let command = random[0];
    let argument = random[1];
    // here we have to circumevent the practical joker who overwrites "do-what-it-says" to random.txt in order to protect the integrity of our call stack
    if (command == "do-what-it-says") {
      console.log(
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
        console.log(`Of course, LIRI is always happy to ${command}.`);
        execute(command);
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              message: `Of course, LIRI is always happy to ${command}, but which one did you mean?`,
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
        console.log("----------------------------------");
        console.log(moment(bit[i].datetime).format("MM/DD/YYYY"));
        console.log(bit[i].venue.name);
        console.log(
          bit[i].venue.city,
          bit[i].venue.region,
          bit[i].venue.country
        );
      }
      console.log("----------------------------------");
    })
    .catch(function(error) {
      console.log("Bands In Town Error: " + error);
    });
}
// this function's name is short for "SPOTIFy your queRY"
function spotifry(argument) {}
// this function gets the data we want from omdb
function omdb(argument) {
  if (argument == "") {
    argument = "Mr. Nobody";
  }
  argument = argument.split(" ").join("+");
  axios
    .get(`http://www.omdbapi.com/?t=${argument}&apikey=trilogy`)
    .then(function(omdb) {
      console.log("----------------------------------");
      console.log(omdb.data.Title);
      console.log(omdb.data.Year);
      console.log(
        omdb.data.Ratings[0].Source + " Rating: " + omdb.data.Ratings[0].Value
      );
      console.log(
        omdb.data.Ratings[1].Source + " Rating: " + omdb.data.Ratings[1].Value
      );
      console.log(omdb.data.Country);
      console.log(omdb.data.Language);
      console.log(omdb.data.Plot);
      console.log(omdb.data.Actors);
      console.log("----------------------------------");
    })
    .catch(function(error) {
      console.log("OMBDisaster:" + error);
    });
}
//      fs.readFile(random.txt
//          data.split(', ')

// log.txt appendFile.
