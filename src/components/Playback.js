import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";
import { ReactComponent as PlayIcon} from "../assets/play.svg"
import { ReactComponent as PauseIcon} from "../assets/pause.svg"

function PlayButton(){
    const queue = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)
    const [playerQueue, setPlayerQueue] = useState(null)

    const play = async () => {     
        if(!playing){
            music.play()
            setPlaying(true)
        }
        else{
            music.pause()
            setPlaying(false)
        }
        
    }
    
    const makeQueue = async () => {
        try{
            const init_queue = await music.setQueue({song: queue[0].id, startPlaying: true}); 
            setPlayerQueue(init_queue)
        }
        catch(err){
            console.log(err)
        }
        
    }

    useEffect(() =>{
        if(queue.length !== 0){
            makeQueue()
            console.log("queue made")
        }     
    }, [queue])

    useEffect(() => {
        if(playerQueue !== null){
            console.log(playerQueue.id) 
        }
        
    },[playerQueue])
    

    return(
        <li className = "nav-item">
            <a href="#" className="play-button" onClick = {play}>
                {playing ? <PauseIcon/> : <PlayIcon/>}
            </a>
        </li>
    )

}

export {PlayButton};