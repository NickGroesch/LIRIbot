// psuedocode
require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
const inquirer = require("inquirer");
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
      console.log("Bands in town: ", argument);
      break;
    case "spotify-this-song":
      console.log("get spotifried: ", argument);
      break;
    case "movie-this":
      console.log("OMBDazzle: ", argument);
      break;
    case "do-what-it-says":
      console.log("RESPECT. MY. AUTHORITY.");
      doIt();
      break;
    default:
      console.log("you are in default");

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
          console.log(input.command);
          let command = input.command;
          let argument;
          console.log(command);
        });

      break;
  }
}
// functions for
// concert
// spotify
// movie

// this function reads the file, then parses it, and based on the contents it will call other functions with arguments
function doIt() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // we should notify the user of errors
    if (error) {
      return console.log(error);
    }
    let random = data.split(",");
    let command = random[0];
    let argument = random[1];
    console.log(command, argument);

    execute(command, argument);
  });
}
//      fs.readFile(random.txt
//          data.split(', ')

// log.txt appendFile.
