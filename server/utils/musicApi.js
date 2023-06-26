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

export const fetchLibrary = async (event) => {

    const userToken = event
    const axiosInstance = getAxios(userToken);

    try {
        const recent = await axiosInstance.get(`/v1/me/library/songs`, {
        params: {
            limit: 30,
        }
        });
        const songs = recent.data;
        return songs;
    } catch(error){
        console.log(error);
    };
};

export const fetchLibraryArtists = async (event) => {

    const userToken = event
    const axiosInstance = getAxios(userToken);

    try {
        const recent = await axiosInstance.get(`/v1/me/library/artists`, {
        params: {
            limit: 30,
        }
        });
        const songs = recent.data;
        return songs;
    } catch(error){
        console.log(error);
    };
};

export const fetchArtistSongs = async (userToken, id) => {


    const axiosInstance = getAxios(userToken);
    const storefront = 'us'
    try {
        const recent = await axiosInstance.get(`/v1/catalog/${storefront}/artists/${id}/songs`);
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

export const fetchRecentArtists = async (event) => {

    const userToken = event

    try {
        const recent = await fetchRecentSongs(userToken);
        const recentArray = recent.data;
        const recentArtists = recentArray.map( song => song.attributes.artistName);
        const recentArtistsSet = new Set(recentArtists);
        return recentArtistsSet;

    } catch(error){
        console.log(error);
    };
};

export const searchRecentArtists = async (event) =>{
    const userToken = event;
    
    try{
        const recentArtists = await fetchRecentArtists(userToken);
        const recentArtistIds = await getArtistIds(userToken, recentArtists);

        
        return recentArtistIds
    }
    catch(error){
        console.log(error)
    }
    
}

export const searchArtist = async (userToken, searchTerm) =>{
        const axiosInstance = getAxios(userToken);
        const storefront = 'us'
    
        try {
            // search terms doesn't guarantee results are from that artist
            const search = await axiosInstance.get(`/v1/catalog/${storefront}/search`, {
                params: {
                    term: searchTerm,
                    limit: 5,
                    types: 'songs',
                }
                });
            
            const songs = search.data.results.songs.data;
             
            return songs;
        } catch(error){
            console.log(error);
        };
}

export const processArtistSet = async (userToken,artists) => {
    const recentArtistsSongs = new Set();
    

    for (const item of artists){
        const songs = await searchArtist(userToken, item);      
        console.log(songs)
        recentArtistsSongs.add(...songs)
    }
    return recentArtistsSongs;

}

export const getArtistIds = async (userToken,artists) => {
    const recentArtistIds = new Set();
    

    for (const item of artists){
        const id = await searchArtistId(userToken, item);    
        if(id !== undefined){
            recentArtistIds.add(id);
        }   
    }
    console.log(recentArtistIds);
    return recentArtistIds;

}


export const searchArtistId = async (userToken, searchTerm) =>{
    const axiosInstance = getAxios(userToken);
    const storefront = 'us';

    try {
       
        const search = await axiosInstance.get(`/v1/catalog/${storefront}/search`, {
            params: {
                term: searchTerm,
                limit: 1,
                types: 'artists',
            }
        })

        const artistId = search.data.results.artists.data[0].id
            
        return artistId;
    } catch(error){
        // console.log(error);
    };
}

