import React , { useContext } from "react";
import { MusicKitContext } from "./MusicKitContext";

function SearchButton (){
    const music = useContext(MusicKitContext);

    function searchMusic(){
        let album = music.library.api.album(1025210938);
        console.log(album.data)
          
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