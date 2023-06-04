import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../Navbar/Navbar";
import AddSong from "./AddtoLibrary";

function Album(props){
    const search = useContext(SearchContext);
    const [hasSearched, sethasSearched] = useState(false);
    const [imgLink, setImgLink] = useState(null);
    const [isHovered,setIsHovered] = useState(false);

    const hoverOn = () => { 
        setIsHovered(true);
    }
    const hoverOff = () => {
        setIsHovered(false);
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
            {hasSearched &&
                <div className= "album-container">   
                    <img src={imgLink} className = {`album-cover ${isHovered ? "hovered": ""}`}  
                    key = {props.song.id} alt = {props.song.id} 
                    onMouseEnter= {hoverOn} onMouseLeave = {hoverOff}/> 
                    <AddSong song = {props.song.id}/>
                    <div className={`album-hover ${isHovered ? "visible": ""}`} onMouseEnter= {hoverOn} onMouseLeave = {hoverOff}>
                        <p>{props.song.attributes.artistName}</p>
                        <p>{props.song.attributes.name}</p>
                    </div>
                </div>
            }
        </div>
        
    );
}

export default Album;
