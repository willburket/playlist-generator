const token = require("./jwt");

const axios = require("axios").create({
  baseURL: 'https://api.music.apple.com',
  headers:{
      Authorization: `Bearer ${token.token}`,
},
});

export const fetchGenre = async (event) => {
  const storefront = 'us';    // change later
  // console.log(token.token);
  console.log(token.token.toString());

  try {
    const playlist = await axios.get(`/v1/catalog/${storefront}/charts`, {
      params: {
        types: 'songs',
        limit: 200,
        genre: event,
      }
    });
    const songs = playlist.data.results;
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: songs
        },
        null,
        2
      )};
    return response;
  }catch(error){
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  };

};
