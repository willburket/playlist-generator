const token = require("./jwt");


const axios = require("axios");

export const fetchRecommendations = async (event) => {

    const userToken = event.headers.Authorization.split(' ')[1];
    console.log(userToken);

    const axiosInstance = axios.create({
        baseURL: 'https://api.music.apple.com',
        headers:{
            Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
            'Music-User-Token': userToken, 
          },
      });

  try {
    const recommendations = await axiosInstance.get(`/v1/me/recommendations`, {
      params: {
        limit: 30,
        // genre: requestBody,
      }
    });
    const songs = recommendations.data;
    const response = {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': 'https://playlinq.io',   // maybe set this as .env var?
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  };

};