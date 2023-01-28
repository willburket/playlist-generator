import React, {createContext, useContext, useEffect, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";


const SearchContext = createContext(null);  

function Main (){
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        console.log(searchResult)
        // console.log(typeof searchResult)
    },[searchResult]);

    function SearchButton (){
        
        async function searchMusic(){
            const { data: result } = await music.api.music('v1/me/library/albums');
    
            setSearchResult({searchResult: result.data});
            // User's iCloud Music Library Albums
            //console.log(result.data);
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
                
            {/* {searchResult.keys(key.id).map(key => (
            <div key={key.id}>
            <p>{id}: {searchResult[key.id].attributes.artistName}</p>
            <p>{id}: {searchResult[key.id].attributes.name}</p>
            </div>
            ))}
                 */}
            </SearchContext.Provider>
        </div>
    )
}

export default Main;

// app
        // navbar
            // search
