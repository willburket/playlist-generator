import React , { useContext, createContext, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";

function SearchButton (){
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState(null)

    async function searchMusic(){
        const { data: result } = await music.api.music('v1/me/library/albums');
        setSearchResult(result.data)
        // User's iCloud Music Library Albums
        console.log(result.data);
    }

    return(
        <li className = "nav-item">
            <a href="#" className="icon-button" onClick = {searchMusic}>
                Search
            </a>
        </li>
    );
}

export  {SearchButton};