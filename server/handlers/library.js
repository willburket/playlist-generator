const token = require("./jwt");
const userToken = require("./userToken");


const axios = require("axios").create({
  baseURL: 'https://api.music.apple.com',
  headers:{
      Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
      'Music-User-Token': userToken.userToken,  
},
});

export const fetchLibrary = async (event) => {
  const storefront = 'us';    // change later
  const requestBody = JSON.parse(event.body);
   // include music user token in http request to apple music

  try {
    const playlist = await axios.get(`/v1/me/library/songs`, {
      params: {
        limit: 200,
      }
    });
    const songs = playlist.data;
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',
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
      body: JSON.stringify({
        error: error.message,
        
     }),
    };
  };

};
