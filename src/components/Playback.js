import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function PlayButton(){
    const queue = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)

    const play = async () => {
        try{  
            const player_queue = await music.setQueue({album: queue[0].id, startPlaying: true});  
            console.log(queue[0])
            setPlaying(!playing)
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
                {playing ? 'Pause' : 'Play'}
            </a>
        </li>
    )

}

export {PlayButton};