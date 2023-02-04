import React, {createContext, useContext, useEffect, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";
import SearchItems from "./SearchItems";
import { PlayButton } from "./Playback";
import AlbumCovers from "./AlbumCovers";

const SearchContext = createContext(null);  


function Main (){
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {

    },[searchResult]);

    function SearchButton (){
        
        async function searchMusic(){    
            setLoading(true)
            try{
                const { data: result } = await music.api.music('v1/me/library/albums'); // can probably make this simpler
                setSearchResult([...result.data])
            }
            catch(err){
                console.log(err)
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
        if(loading) return <p>Loading...</p>        // search button and play button disappear during load 

        return(
            <div>
                <SearchButton/>
                <SearchContext.Provider value = {searchResult}>
                    {/* <SearchItems/> */}
                    <AlbumCovers />
                    <PlayButton/> 
                </SearchContext.Provider>
            </div>
        );
}

export {Main, SearchContext};

                
