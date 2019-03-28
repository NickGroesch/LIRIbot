# LIRI Bot

_A Trilogy Boot Camp Homework Assignment_ by **Nick Groesch**

## **Meet LIRI.**

LIRI is like iPhone's SIRI, but old school. LIRI is a command line node app that takes in parameters and gives back data.

LIRI can take any of the following commands, as well as an indeterminately long argument (the `this`) for the command.

- `concert-this`

- `spotify-this-song`

- `movie-this`

- `do-what-it-says`

### What Will It Do?

`node liri.js concert-this <artist/band name here>`

- LIRI will search the Bands in Town Artist Events API for an artist and render the following information about each concert event to the terminal:

  - Name of the venue
  - Venue location
  - Date of the Event

- If the user doesn't know who to see, they will be recommended Backstreet Boys, because they will have _**a lot**_ of opportunities to see them!

`node liri.js spotify-this-song '<song name here, optionally also artists, etc. for specificity>'`

- LIRI will show the following information about the song in the terminal/bash window:

  - Artist
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from

- Thanks to the **boundless wisdom** of the boot camp instructional staff, LIRI defaults to "The Sign" by Ace of Base.

- LIRI utilizes the `node-spotify-api` package in order to retrieve song information from the Spotify API.

`node liri.js movie-this '<movie name here>'`

- LIRI will happily output the following information to the terminal/bash window using the `axios` package to retrieve this data from the OMDB API:

  - Title of the movie
  - Year the movie came out
  - IMDB Rating of the movie
  - Rotten Tomatoes Rating of the movie
  - Country where the movie was produced
  - Language of the movie
  - Plot of the movie
  - Actors in the movie

- If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody,' because it's rumored to be amazing

`node liri.js do-what-it-says`

- LIRI will use the `fs` node package to take the content of `random.txt` and then use it to call one of LIRI's commands.

- The user is welcome to edit the text in random.txt to test out the feature for movie-this and concert-this.
  _Attempts to create an infinite loop by writing 'do-what-it-says' will **not** be tolerated_.

### _There Are Included Bonus Features?_

- In addition to logging the data to the terminal/bash window, the data is handily appended to a file called `log.txt`, using a convention to split input into usable arrays of data:

  - Each instance of the the program's execution is separated by `;;;;`.
  - Each instance of logging within an execution is separated by `;;;`.
  - Each log is split into two sections to separate the command and the argument by `;;`.

- This convention allows later splitting of the `log.txt` string for reconstruction of the individual inputs and program outputs.

### **Sweet, There's More!**

- _We all_ know how hard it is to remember command line syntax, or use proper orthography. LIRI knows we're _only_ human, and uses the `inquirer` node package to figure out what we mean, and give us what we want.

- Check out [the video demo!](https://youtu.be/NPm3gM-kfso)-- if you don't have six minutes, run it at double speed!
