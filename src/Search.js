import React , { useContext } from "react";
import { MusicKitContext } from "./MusicKitContext";

function SearchButton (){
    const music = useContext(MusicKitContext);

    async function searchMusic(){
        const { data: result } = await music.api.music('v1/me/library/albums');
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

function Albums (){
    // const music = useContext(MusicKitContext);
    // const imgSrc = music.formatArtworkURL(artwork, 200, 200);
    // console.log(imgSrc);
    // return(
    //     <div>
    //         <img src = {imgSrc} alt = 'album art' />
    //     </div>
    // )

}


export  {SearchButton, Albums};