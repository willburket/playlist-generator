import React, {useContext, useEffect, useState} from "react";

function NowPlaying(props){
    const song = props.song;
    const music = props.music;
    const [imgLink, setImgLink] = useState(null);
    
    useEffect(() => {
        if(song !== null){
            const link = window.MusicKit.formatArtworkURL(props.song.attributes.artwork,200,200);
            setImgLink(link);
        }

    }, [song])

    return(
        <div className="playing-container">
            <img src={imgLink} className = "playing-item"/> 
        </div>
    );
}

export default NowPlaying;