import React from "react";
import { ReactComponent as PlayIcon} from "../../assets/images/play-circle.svg";  
import { playItem } from "../../services/MusicApi";

function Play(props){
    const song = props.song;

    const onClick = async () => {
        playItem(song);
    }

    
    // keep track of place in the queue with id array (enumerate?)

    // slice the queue at our given index 
    // use setQueue with array as input
    // play queue 
    // show pause button while playing?

    return(
    <div className="play-container">
        <a href = "#" className="grid-button" >
            <PlayIcon onClick = {onClick}/>
        </a>
    </div>
    );
}

export default Play;