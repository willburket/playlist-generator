const token = require("./jwt");
//const userToken = require("./userToken");


const axios = require("axios");

export const fetchLibrary = async (event) => {
    const storefront = 'us';    // change later
//   const userToken = JSON.parse(event.body);
    const userToken = event.headers.Authorization.split(' ')[1];
    console.log(userToken)

  const axiosInstance = axios.create({
    baseURL: 'https://api.music.apple.com',
    headers:{
        Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
      //   Accept: 'application/json',
      //   'Content-Type': ',
        'Music-User-Token': userToken,  
  },
  });

  try {
    const playlist = await axiosInstance.get(`/v1/me/library/songs`, {
      params: {
        limit: 25,
      }
    });
    const songs = playlist.data;
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
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
    console.log(error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        
     }),
    };
  };

};
