import React, { useContext, useEffect } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function AlbumCovers(){
    const search = useContext(SearchContext)
    const images = []

    if(search){
        image_extract()
    }

    function image_extract(){

        for (let i = 0; i < search.length; i++ ){
            const artwork = search[i].attributes.artwork;
            const img = window.MusicKit.formatArtworkURL(artwork, 200, 200);
            images.push({image: img, id: search[i].id})
        }
        
    }

    useEffect(() => {

    }, [search])

    return(
        <div className= "album-cover-grid">
            {images.map(item => (
                <img src={item.image} key = {item.id} className = "album-cover"/>
            ))}
        </div>
    )
}

export default AlbumCovers;
