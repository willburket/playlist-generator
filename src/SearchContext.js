import React , { useContext, createContext, useState} from "react";
import { MusicKitContext } from "./MusicKitContext";


const SearchContext = createContext(null);

const music = useContext(MusicKitContext)

function Albums (){


        async function searchMusic(){
            const { data: result } = await music.api.music('v1/me/library/albums');
            // User's iCloud Music Library Albums
            console.log(result.data);
        }

        const music = useContext(MusicKitContext);
        // const imgSrc = music.formatArtworkURL(artwork, 200, 200);
        // console.log(imgSrc);
        return(
            <div>
                <img src = {imgSrc} alt = 'album art' />
            </div>
        );
    
}

export {SearchContext}