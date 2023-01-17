import React , { useContext } from "react";
import { MusicKitContext } from "./MusicKitContext";

function SearchButton (){
    const music = useContext(MusicKitContext);

    function searchMusic(){
        const { data: result } = music.api.music('v1/me/library/albums');
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

export default SearchButton;