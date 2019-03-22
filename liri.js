// psuedocode
require("dotenv").config();
const keys = require("./keys.js");
const fs = require("fs");
// var spotify = new Spotify(keys.spotify);

// install the required packages

// user commands (process.argv)
let command = process.argv[2];
let argument = process.argv.slice(3).join(" ");
// *give an inquirer if no input, with conditional in the promise
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
    break;
  default:
    console.log("you are in default");
    break;
}
// functions for
// concert
// spotify
// movie

// dowhatitsays
//      fs.readFile(random.txt
//          data.split(', ')

// log.txt appendFile.
