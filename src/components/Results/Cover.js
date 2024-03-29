import React, { useContext, useEffect, useState } from "react";
// import { SearchContext } from "../Navbar/Navbar";
import { SearchContext } from "../Navbar/Main";
import AddSong from "./AddtoLibrary";
import Play from "./Play";

function Album(props){
    const search = useContext(SearchContext);
    const [hasSearched, sethasSearched] = useState(false);
    const [imgLink, setImgLink] = useState(null);
    const [isHovered,setIsHovered] = useState(false);
    const [playlist,setPlaylist] = useState([]);

    const hoverOn = () => { 
        setIsHovered(true);
    }
    const hoverOff = () => {
        setIsHovered(false);
    }

    useEffect(() => {
        
        if(search && search.length !== 0){
            sethasSearched(true);
            // setPlaylist(search.slice(0,20))
            setPlaylist(search)
            const link = window.MusicKit.formatArtworkURL(props.song.attributes.artwork,200,200)
            setImgLink(link)
        }     
    }, [search]);
     
    return(
        <div>
            {hasSearched &&
                <div className= "album-container">   
                    <img src={imgLink} className = {`album-cover ${isHovered ? "hovered": ""}`}  
                    key = {props.song.id} alt = {props.song.id} 
                    onMouseEnter= {hoverOn} onMouseLeave = {hoverOff}/> 
                    <AddSong song = {props.song.id}/>
                    <Play song = {props.song} index = {props.index} queue = {playlist}/>
                    <div className={`album-hover ${isHovered ? "visible": ""}`} onMouseEnter= {hoverOn} onMouseLeave = {hoverOff}>
                        <p>{props.song.attributes.name}</p>
                        <p>{props.song.attributes.artistName}</p>
                    </div>
                </div>
            }
        </div>
        
    );
}

export default Album;
