// create dict in session storage 
// key for each genre that you encounter in profile recommendations
// add songs to dict from top 200 as they are searched by user 
// clear out unneeded songs to make more space? 

// check array size for client side cache

// const jsonString = JSON.stringify(searchResult);
// const bytes = new TextEncoder().encode(jsonString).length
// const megabytes = bytes/(1024*1024);
// console.log(`approx size: ${megabytes.toFixed(2)} MB`);
import { shuffle } from "./Playlist";

export const cacheCreate = () =>{
    try {
        const genreDict = {
            'hip-hop/rap':[],
            'pop':[],
            'rock':[],
            'r&b/soul':[],
            'alternative':[],
            'dance':[],
            'country':[],
            'latin':[],
            'raggae':[],
            'classical':[],
        };
    
        const cache = JSON.stringify(genreDict)
        sessionStorage.setItem('songCache', cache)
        console.log("cache created successfully")
    } catch (error){
        console.log(error)
    }
    
}

export const genreSearchToCache = (genre,songs) => {
    try {
        const sessionDataJSON = sessionStorage.getItem('songCache')
        const sessionData = JSON.parse(sessionDataJSON)

        if(!sessionData.hasOwnProperty(genre)){
            console.log("key not in session data")
        }
        sessionData[genre].push(...songs)
        shuffle(sessionData[genre])     // shuffle full array
        const updatedSessionDataJSON = JSON.stringify(sessionData)
        sessionStorage.setItem('songCache', updatedSessionDataJSON)
        console.log("songs added to session storage")
        return sessionData[genre].slice(0,20)       // return first 20 since this is first call to genre
    } catch (error){
        console.log(error)
    }
}

export const getFromCache = (genre, searchNum) => {
    try{
        const sessionDataJSON = sessionStorage.getItem('songCache')
        const sessionData = JSON.parse(sessionDataJSON)
        let start = searchNum*20
        if(start + 20 >= sessionData[genre].length){
            shuffle(sessionData[genre]) 
            start = 0
        } 
        return sessionData[genre].slice(start, start + 20)
    } catch(error){
        console.log(error)
    }
}

export const profileToCache = () => {

}

// how do we know if session storage is full? make sure we don't over add 