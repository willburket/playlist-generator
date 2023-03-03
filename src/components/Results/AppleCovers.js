import React, { useContext, useEffect } from "react";
import { SearchContext } from "../Navbar/Navbar";

function AppleCovers(){
    const search = useContext(SearchContext)

    useEffect(() => {
    }, [search])

    return(
    
        <div className= "album-cover-grid">
            {search.map(item => (
                <div key = {item.id}>
                    <apple-music-artwork-lockup type="song" content-id = {item.id}></apple-music-artwork-lockup>
                </div>
            ))}
        </div>
      
    )
}

export default AppleCovers;
