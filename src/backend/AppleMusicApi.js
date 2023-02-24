const token = require("./TokenConfig")


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
    })
    const songs = response.data.results 

  return songs
  
}
  


module.exports = {
  fetchCharts: fetchCharts,
    
}




// async function fetchCharts(storefront, genre){
//   let songs = null
//   try {
//     axios.get(`/v1/catalog/${storefront}/charts`, {
//       params: {
//         types: 'songs',
//         limit: 2,       //change
//         genre: genre,
//       }
      
//     }).then(function(response){
//       // const songs = response.data.results.songs[0]
//       songs = response.data.results
//       // console.log(songs[0])
//       // console.log(genre)
//       console.log(songs)
//     });

//   } catch (error) {
//     console.error(error);
//     return null
//   }
//   return songs
  
// }