import React, { useContext, useEffect } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function AlbumCovers(){
    const search = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const images = []

    if(search){
        image_extract()
    }

    function image_extract(){

        for (let i = 0; i < search.length; i++ ){
            const artwork = search[i].attributes.artwork;
            const img = window.MusicKit.formatArtworkURL(artwork, 200, 200);
            images.push(img)
        }
        
    }

    useEffect(() => {

    }, [search])

    return(
        <div className= "album-cover-grid">
            {images.map(item => (
                <img src={item} key = {item.id} className = "album-cover"/>
            ))}
        </div>
    )
}

export default AlbumCovers;

    // <div>
    //     {search ? (
    //     <ul>
    //     {search.map(item => (
    //     <li key={item.id}>{item.attributes.artistName}: {item.attributes.name}</li>
    //     ))}
    //     </ul>
    //     ) : (
    //     <p>No items found</p>
    //     )}
    // </div>   