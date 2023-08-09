import React, { useEffect, useState} from "react";
import {ReactComponent as Record} from "../../assets/images/record.svg"

function NowPlaying(props){
    const song = props.song;
    const [imgLink, setImgLink] = useState(null);
    const [svgSize,setSvgSize] = useState(null)

    useEffect(() => {
        if (window.innerWidth >= 500) {
            // Return the larger SVG size for screens larger than or equal to 768px
            setSvgSize(50);
          } 
        else {
            // Return the smaller SVG size for screens smaller than 768px
            setSvgSize(80);
          }

    }, [window.innerWidth])

    
    
    useEffect(() => {
        if(song !== null){
            const link = window.MusicKit.formatArtworkURL(props.song.attributes.artwork,200,200);
            setImgLink(link);
        }

    }, [song])

    return(
        <div className="playing-container">
            {imgLink !== null ? <img src={imgLink} className = "playing-item"/> : <Record width = {svgSize} height = {svgSize}/>}
            
        </div>
    );
}

export default NowPlaying;