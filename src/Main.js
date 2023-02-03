import React, {createContext, useContext, useEffect, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";
import SearchItems from "./SearchItems";
import { PlayButton } from "./Playback";

const SearchContext = createContext(null);  
const QueueContext = createContext(null);

function Main (){
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)
    const [queue, setQueue] = useState([])

    useEffect(() => {
        // if(searchResult){
        //     makeQueue()
        // }
        // console.log(queue)
    },[searchResult]);

    function SearchButton (){
        
        async function searchMusic(){    
            setLoading(true)
            try{
                const { data: result } = await music.api.music('v1/me/library/albums'); // can probably make this simpler
                setSearchResult([...result.data])
                setQueue([...result.data])
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
                    <SearchItems/>
                    <QueueContext.Provider value ={queue}>
                        <PlayButton/>
                    </QueueContext.Provider>
                </SearchContext.Provider>
            </div>
        );
}

export {Main, SearchContext, QueueContext};

                
