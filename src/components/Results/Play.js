import React, { useState } from "react";
import { ReactComponent as PlayIcon} from "../../assets/images/play-circle.svg";  
import { playItem } from "../../services/MusicApi";


function Play(props){
    const song = props.song;
    const index = props.index;
    const queue = props.queue;

    const [playing,setPlaying] = useState(false);

    // use listener for when track changes 
    // check music isplaying, if our song is playing set playing to true 



    

    const onClick = async () => {
        playItem(index, queue);
    }

    
    

    return(
    <div className="play-container">
        <a href = "#" className="grid-button" >
            <PlayIcon onClick = {onClick}/>
        </a>
    </div>
    );
}

export default Play;