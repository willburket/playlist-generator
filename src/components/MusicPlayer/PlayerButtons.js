import React from "react";
import { ReactComponent as PlayIcon } from "../../assets/images/play.svg"
import { ReactComponent as PauseIcon } from "../../assets/images/pause.svg"

function PlayButton(props){ 

    const playing = props.status;
    const onClick = props.onClick;

    return(           
        <div className="player-button" onClick = {onClick} data-testid = "play-button">
            {playing ? <PauseIcon/> : <PlayIcon/>}
        </div>            
    );
}

function DisplayButton(props){
    
    return (           
        <div className="player-button" onClick = {props.onClick} data-testid = "display-button">
            {props.icon}
        </div>           
    );
}

export{ PlayButton, DisplayButton };