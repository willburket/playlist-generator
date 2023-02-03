import React, { useContext, useEffect, useState } from "react";
import { QueueContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function PlayButton(){
    const queue = useContext(QueueContext)
    const music = useContext(MusicKitContext)

    const play = async () => {
        try{
            
            const player_queue = await music.setQueue({album: queue[0].id, startPlaying: true});  
            console.log(queue[0])

        }
        catch(err){
            console.log(err)
        }
        
    }
    
    useEffect(() =>{
        // makeQueue();
    }, [queue])
    

    return(
        <li className = "nav-item">
            <a href="#" className="icon-button" onClick = {play}>
                Play
            </a>
        </li>
    )

}

export {PlayButton};