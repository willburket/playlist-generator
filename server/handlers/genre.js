const token = require("./token");

const axios = require("axios").create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.handler.message}`,   
    },
});

const fetchGenre = async (genre) => {

  const storefront = 'us';    // change later
  const playlist = await axios.get(`/v1/catalog/${storefront}/charts`, {
    params: {
      types: 'songs',
      limit: 200,      
      genre: genre,
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
    )
  }
  return response;
};
  


module.exports = {
  handler: fetchGenre,
    
}



