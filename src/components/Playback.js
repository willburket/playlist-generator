import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";

function PlayButton(){
    const queue = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)
    let player_queue = null

    const play = async () => {
        if(!player_queue){
            try{  
                player_queue = await music.setQueue({album: queue[0].id, startPlaying: true}); 
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
            }
            else{
                music.pause()
            }
        }
        
    }
    
    useEffect(() =>{
        // makeQueue();
    }, [queue])

    // useEffect(() => {

    // },[playing])
    

    return(
        <li className = "nav-item">
            <a href="#" className="play-button" onClick = {play}>
                {playing ? 'Pause' : 'Play'}
            </a>
        </li>
    )

}

export {PlayButton};