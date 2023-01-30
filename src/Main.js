import React, {createContext, useContext, useEffect, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";

const SearchContext = createContext(null);  

function Main (){
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(searchResult)       // getting called twice for some reason    
    },[searchResult]);

    function SearchButton (){
        
        async function searchMusic(){    
            setLoading(true)
            try{
                const { data: result } = await music.api.music('v1/me/library/albums'); // users albums 
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
        if(loading) return <p>Loading...</p>

        return(
            <div>
                <SearchButton/>
                <SearchContext.Provider value = {searchResult}>
                <div>
                    {searchResult ? (
                    <ul>
                    {searchResult.map(item => (
                    <li key={item.id}>{item.attributes.artistName}: {item.attributes.name}</li>
                    ))}
                    </ul>
                    ) : (
                    <p>No items found</p>
                    )}
                </div>        
                </SearchContext.Provider>
            </div>
        );
}

export default Main;


