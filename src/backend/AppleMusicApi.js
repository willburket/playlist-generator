const token = require("./TokenConfig")


const axios = require("axios").create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.token}`,
    },
});

module.exports = {

    fetchArtist: async (artistId) => {
        try {
          const { data } = await axios.get(`/v1/catalog/us/artists/${artistId}`);
    
          return data.data[0];
        } catch (error) {
          console.error(error);
          return null;
        }
      },

}

