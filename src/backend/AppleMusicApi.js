const token = require("./TokenConfig")


const axios = require("axios").create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.token}`,
    },
});

module.exports = {
 
    fetchCharts: async (storefront, genre) => {
      try {
        axios.get(`/v1/catalog/${storefront}/charts`, {
          params: {
            types: 'songs',
            limit: 2,       //change
            genre: genre,
          }
        }).then(function(response){
          const songs = response.data.results.songs[0].data
          // console.log(songs[0])
          console.log(songs)
          return songs;
        });

      } catch (error) {
        console.error(error);
      }
    },


}




