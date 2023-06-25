const apple = require("../utils/musicApi");
const playlist = require("../utils/playlist")

export const fetchProfile = async (event) => {
    
    const recentArtistsSongs = new Set();
    const userToken = event.headers.Authorization.split(' ')[1];
    const item = '1097177293'
    // console.log(userToken);

    try {
        const recentArtists = await apple.searchRecentArtists(userToken);
        // for (const item of recentArtists){
        //     const songs = await apple.fetchArtistSongs(userToken, item);      
        //     console.log(songs)
        //     recentArtistsSongs.add(...songs)
        // }
        
        const songs = await apple.fetchArtistSongs(userToken, item);      
        console.log(songs.data);
        // grab songs from artists in recent, library, recs, etc.
        // filter out songs in recent, lib, recs, etc.
        // create set?
        // sort by genre 
        // cache 

    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',   // maybe set this as .env var?
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message: recentArtistsSongs
        },
        null,           // lets figure out what all this means
        2
      )};
    return response;
  } catch(error){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  };
};