const apple = require("../utils/musicApi")
// const userToken = require("./userToken");

const axios = require("axios");

export const fetchProfile = async (event) => {

    const userToken = event.headers.Authorization.split(' ')[1];
    console.log(userToken);

    try {
        const songs = await apple.fetchRecentSongs(userToken);
        console.log(songs);
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',   // maybe set this as .env var?
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message: songs
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