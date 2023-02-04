import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function PlayButton(){
    const queue = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)
    let playerQueue = null
    // const [playerQueue, setPlayerQueue] = useState([])

    const play = async () => {
        if(playerQueue == null){
            try{  
                playerQueue = await music.setQueue({album: queue[0].id, startPlaying: true}); 
                // setPlayerQueue([up_next])
                console.log(queue[0])
                setPlaying(!playing)
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            if(!playing){
                music.play()
                setPlaying(true)
            }
            else{
                music.pause()
                setPlaying(false)
            }
        }
        
    }
    
    useEffect(() =>{
        // makeQueue();
    }, [queue])

    useEffect(() => {

    },[playerQueue])
    

    return(
        <li className = "nav-item">
            <a href="#" className="play-button" onClick = {play}>
                {playing ? 'Pause' : 'Play'}
            </a>
        </li>
    )

}

export {PlayButton};