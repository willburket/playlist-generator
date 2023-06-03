const token = require("./jwt");

const axios = require("axios").create({
  baseURL: 'https://api.music.apple.com',
  headers:{
      Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
},
});

export const addSong = async (event) => {
  const storefront = 'us';    // change later
  const requestBody = JSON.parse(event.body);
  // const songId = '1565443631';

  try {
    const playlist = await axios.post(`/v1/me/library?ids[songs]=[${requestBody}]`, {
      params: {
        types: 'songs',
        limit: 200,
        genre: requestBody,
      }
    });
    const response = {
      statusCode: 200,
      headers:{
        // 'Access-Control-Allow-Origin': 'https://willburket.github.io',
        'Access-Control-Allow-Origin': 'https://playlinq.io',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
        {
          message: 'added to library'
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
