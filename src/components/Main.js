import React, {createContext, useContext, useEffect, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";
import { MusicPlayer, PlayButton } from "./Playback";
import AlbumCovers from "./AlbumCovers";
import { NavbarContext } from "./Navbar";
import Home from "./Home";


const SearchContext = createContext(null);  
const LoadContext = createContext(null);


function Main (){
    const music = useContext(MusicKitContext);
    const selected = useContext(NavbarContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        // console.log(selected)
    }, [selected]);

    useEffect(() => {
        // console.log(searchResult)
    },[searchResult]);

    function SearchButton (){
        
        async function searchMusic(){    
            setLoading(true)
            try{
                const queryParameters = { term: selected.value, types: ['songs'], l: 'en-us', limit: 25};
                const search = await music.api.music('/v1/catalog/{{storefrontId}}/search', queryParameters);
                setSearchResult([...search.data.results.songs.data])
                
                // charts with v3
                // const queryParameters = {types: ['songs'], l: 'en-us', limit: 25};
                // const search = await music.api.music(`/v1/catalog/{{storefrontId}}/charts`, queryParameters);   // works 
                // setSearchResult([...search.data.results.songs[0].data])  // works for charts 
                
            }
            catch(err){
                console.log(err)        // add popup for when nothing is selected 
            }
            finally{
                setLoading(false)
            }
        }
        
        
        return(
            <li className = "nav-item">
                <a href="#" className="search-button" onClick = {searchMusic}>
                    Search
                </a>
            </li>
        );
    }   

        return(
            <div>
                <SearchButton/>
                <SearchContext.Provider value = {searchResult}>
                    <MusicPlayer/>
                    {/* <PlayButton/> */}
                    <LoadContext.Provider value = {loading}>
                        <Home/>
                        <AlbumCovers/> 
                    </LoadContext.Provider>
                </SearchContext.Provider>
            </div>
        );
}

export {Main, SearchContext, LoadContext};

                
// works with player
// const { data: result } = await music.api.music('v1/me/library/albums'); // this actually works for v3
// const {data: result} = await music.api.music('/v1/catalog/{{storefrontId}}/albums/1025210938'); // works
// setSearchResult([...result.data])


// works with v1 api
// const search = await music.api.charts(['songs'], queryParameters)    // works for v1
// const search = await music.api.search('rap', queryParameters);   // works for v1