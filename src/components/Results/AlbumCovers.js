import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../Navbar/Nav";

function AlbumCovers(){
    const search = useContext(SearchContext);
    const images = [];
    const [covers, setCovers] = useState([]);
    const [hasSearched, sethasSearched] = useState(false)
    

    function image_extract(search){
        
        const length = 20;

        for (let i = 0; i < length; i++ ){
            const artwork = search[i].attributes.artwork;
            const img = window.MusicKit.formatArtworkURL(artwork, 200, 200);
            images.push({image: img, id: search[i].id});
        }
        setCovers(images);
    }

    useEffect(() => {
            if(search && search.length !== 0){
                image_extract(search);
                sethasSearched(true)
            }
            
    }, [search]);

    return(
        <div>
            { hasSearched &&
            <div className="grid-container">
                <div className= "album-cover-grid">
                {covers.map(item => (
                    <img src={item.image} key = {item.id} className = "album-cover" alt = {item.id}/>
                ))}
                </div>
            </div>}
        </div>
        
    );
}

export default AlbumCovers;
