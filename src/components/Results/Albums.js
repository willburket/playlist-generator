import React, { useContext, useEffect, useState } from "react";
import { SearchContext, LoadContext } from "../Navbar/Navbar";
import AddSong from "../MusicPlayer/AddtoLibrary";

function AlbumCovers(){
    const search = useContext(SearchContext);
    const loading = useContext(LoadContext);
    const [hasSearched, sethasSearched] = useState(false);
    const [playlist,setPlaylist] = useState([]);
    
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
                    <div className="album-container" key = {item.id}>
                    <img src={window.MusicKit.formatArtworkURL(item.attributes.artwork,200,200)} className = "album-cover" key = {item.id} alt = {item.id}/>
                    <AddSong song = {item.id}/>
                    </div>
                ))}
                </div>
            </div>}
        </div>
        
    );
}

export default AlbumCovers;
