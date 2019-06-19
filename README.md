# Liri Bot
---

### Description & Requirements
---
Liri is a command line application that takes user commands and queries from the command line and returns data from API's. liri.js can take utilize the following commands:

Commands | Function
---------|---------
concert-this | uses the **bandsintown** API to take a band name from the user and returns that bands next concert
![concert](/images/concert-this.png)
spotify-this | uses the **spotify** API to take a song name from the user and returns the artist, song name, spotify-link and album 
![spotify](/images/spotify-this-song.png)
movie-this | uses the **OMDB** API to take a movie name and returns the name, cast, release year, IMDB and Rotten Tomatoes rating, country of origin, language and plot 
![movie](/images/movie-this.png)
do-this | uses the built in **readFile()** method to access data from a prepopulated .txt file and return its information as a command/search query.