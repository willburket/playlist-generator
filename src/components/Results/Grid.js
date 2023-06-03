import React, { useContext, useEffect, useState } from "react";
import { SearchContext, LoadContext } from "../Navbar/Navbar";
import AddSong from "../MusicPlayer/AddtoLibrary";
import Album from "./Cover";

function AlbumCovers(){
    const search = useContext(SearchContext);
    const loading = useContext(LoadContext);
    const [hasSearched, sethasSearched] = useState(false);
    const [playlist,setPlaylist] = useState([]);
    const [isHovered,setIsHovered] = useState(false);

    useEffect(() => {
        if(search && search.length !== 0){
            sethasSearched(true)
            setPlaylist([...search.slice(0,20)]);
        }     
    }, [search]);

    if(loading) return (<div></div>);       
    return(
        <div>
            { hasSearched &&
            <div className="grid-container">
                <div className= "album-cover-grid">
                {playlist.map(item => (
                    
                    <Album song = {item} key = {item.id}/>
                    
                ))}
                </div>
            </div>}
        </div>
        
    );
}

export default AlbumCovers;
