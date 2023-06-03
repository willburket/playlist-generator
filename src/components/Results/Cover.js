import React, { useContext, useEffect, useState } from "react";
import { SearchContext, LoadContext } from "../Navbar/Navbar";
import AddSong from "../MusicPlayer/AddtoLibrary";

function Album(props){
    const search = useContext(SearchContext);
    const loading = useContext(LoadContext);
    const [hasSearched, sethasSearched] = useState(false);
    const [imgLink, setImgLink] = useState(null);
    const [isHovered,setIsHovered] = useState(false);

    const hover = () => {
        setIsHovered(true);
        // console.log(isHovered);
    }
    const endHover = () => {
        setIsHovered(false);
        // console.log(isHovered);
    }    

    useEffect(() => {
        if(search && search.length !== 0){
            sethasSearched(true);
            const link = window.MusicKit.formatArtworkURL(props.song.attributes.artwork,200,200)
            setImgLink(link)
        }     
    }, [search]);
     
    return(
        <div>
            { hasSearched &&
                <div className="album-container">
                    <img src={imgLink} className = "album-cover" key = {props.song.id} alt = {props.song.id} onMouseEnter= {hover} onMouseLeave = {endHover}/>
                    <AddSong song = {props.song.id}/>
                    {isHovered && <div className="album-hover">
                    {props.song.attributes.name}
                    
                    </div>}
                    
                </div>
            }
        </div>
        
    );
}

export default Album;
