const token = require("../handlers/jwt");
const axios = require("axios");

export const fetchRecentSongs = async (event) => {

    const userToken = event
    const axiosInstance = getAxios(userToken);

    try {
        const recent = await axiosInstance.get(`/v1/me/recent/played/tracks`, {
        params: {
            types: 'songs',
            limit: 30,
        }
        });
        const songs = recent.data;
        return songs;
    } catch(error){
        console.log(error);
    };
};

export const getAxios = (event) => {
    const userToken = event;
    const axiosInstance = axios.create({
        baseURL: 'https://api.music.apple.com',
        headers:{
            Authorization: `Bearer ${token.token}`,   // this signs every time we fetch a new genre, probably want to do it differently (cache?, s3?)
            'Music-User-Token': userToken, 
          },
    });

    return axiosInstance;
}