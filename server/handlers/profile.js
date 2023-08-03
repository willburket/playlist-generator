const apple = require("../utils/musicApi");
const redis = require("../utils/redis")

export const fetchProfile = async (event) => {
    const recentArtistsSongs = [];
    const userToken = event.headers.Authorization.split(' ')[1];

    
    try {
        const recentArtists = await apple.searchRecentArtists(userToken);
        for (const item of recentArtists){
            const songs = await apple.fetchArtistSongs(userToken, item);
            recentArtistsSongs.push(...songs.data);
        }
        const sortedSongs = apple.genreSort(recentArtistsSongs);    // create hash of songs sorted by genre
        console.log(sortedSongs);
        redis.addtoRedisCluster(sortedSongs)

        // put genre dict into redis cluster hash
        

    const response = {
      statusCode: 200,
      headers:{
        // 'Access-Control-Allow-Origin': 'https://playlinq.io',   // maybe set this as .env var?
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message: sessionId        // return session id or undef
        },
        null,      
        2
      )};
    return response;
  } catch(error){
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  };
};

// grab songs from artists in recent, library, recs, etc.
// filter out songs in recent, lib, recs, etc.
// create set?
// sort by genre
// cache