const apple = require('./musicApi');

export const fetchRecentArtists = async (event) => {

    const userToken = event

    try {
        const recent = await apple.fetchRecentSongs(userToken);
        const recentArray = recent.data;
        const recentArtists = recentArray.map( song => song.attributes.artistName);
        const recentArtistsSet = new Set(recentArtists);
        return recentArtistsSet;

    } catch(error){
        console.log(error);
    };
};

