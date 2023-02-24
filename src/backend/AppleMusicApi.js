const token = require("./TokenConfig")


const axios = require("axios").create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.token}`,
    },
});

module.exports = {
 
    fetchCharts: async (storefront) => {
      try {
        axios.get(`/v1/catalog/${storefront}/charts`, {
          params: {
            types: 'songs',
            limit: 25,
            genre: '14'
            // genre: '',
          }
        }).then(function(response){
          const songs = [...response.data.results.songs]
          console.log(songs)
        });

      } catch (error) {
        console.error(error);

      }
    },

}




