const token = require("./TokenConfig");


const axios = require("axios").create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.token}`,
    },
});

async function fetchCharts(storefront, genre){
  
    const response = await axios.get(`/v1/catalog/${storefront}/charts`, {
      params: {
        types: 'songs',
        limit: 200,      
        genre: genre,
      }
    });
    const songs = response.data.results; 

  return songs;
  
};
  


module.exports = {
  fetchCharts: fetchCharts,
    
}



