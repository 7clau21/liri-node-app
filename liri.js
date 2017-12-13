var fs = require('fs'); 
var twitterKeys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");
//process[2] choses action, process[3] as search parameter for spotify or movie.
var userCommand = process.argv[2];
//var secondCommand = process.argv[3];
//process multiple words. Triggers if user types anything more than the above console logged options and first parameter.
    //for(i=4; i<process.argv.length; i++){
        //secondCommand += '+' + process.argv[i];
    //}

    
//functions/options
var client = new twitter(twitterKeys);
function myTweets(){
     //parameters for twitter function.
    var params = {screen_name: '7clau21', count: 20};
    //call the get method on our client variable twitter instance
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) { 
            for (i=0; i<tweets.length; i++) {
                var returnedData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(returnedData);
                console.log("-------------------------");
        }
    };
    });
};
//end Tweets;
//---SPOTIFY
var spotify = new Spotify({
    id: 'b38bdf99424949e4aaba5deb3559c2aa',
    secret: 'feabb2b570c948b78aaaf1bd055304fb'
});
function spotifySong(){
    spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++){
            console.log(data.tracks.items[i].name);
        }
    })
}

//<----OMDB Code---->//
function movie(){
    request('http://www.imdb.com', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });
};
//<----Do What It Says Code---->//
function doThis(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err){
            console.log(err)
        }else {
            console.log(data)
        };
    });
};


//action statement, switch statement to declare what action to execute.
switch(userCommand){
    case 'my-tweets':
    myTweets();
    break;
    case 'spotify-this-song':
    spotifySong();
    break;
    case 'movie-this':
    movie();
    break;
    case 'do-what-it-says':
    doThis();
    break;
    
};


