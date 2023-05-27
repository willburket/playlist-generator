const token = require("./jwt");

const axios = require("axios").create({
  baseURL: 'https://api.music.apple.com',
  headers:{
      Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
},
});

export const fetchGenre = async (event) => {
  const storefront = 'us';    // change later
  const requestBody = JSON.parse(event.body);

  try {
    const playlist = await axios.get(`/v1/catalog/${storefront}/charts`, {
      params: {
        types: 'songs',
        limit: 200,
        genre: requestBody,
      }
    });
    const songs = playlist.data.results;
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://willburket.github.io',
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
