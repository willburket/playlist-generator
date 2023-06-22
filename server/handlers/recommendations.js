const token = require("./jwt");
const userToken = require("./userToken");

const axios = require("axios").create({
  baseURL: 'https://api.music.apple.com',
  headers:{
      Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
      'Music-User-Token': userToken.userToken, 
    },
});

export const fetchRecommendations = async (event) => {

//   const requestBody = JSON.parse(event.body);

  try {
    const recent = await axios.get(`/v1/me/recommendations`, {
      params: {
        types: 'songs',
        limit: 30,
        // genre: requestBody,
      }
    });
    const songs = recent.data;
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',   // maybe set this as .env var?
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