import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";
import { ReactComponent as PlayIcon} from "../assets/play.svg"
import { ReactComponent as PauseIcon} from "../assets/pause.svg"

function MusicPlayer(){
    const search = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)
    const [playerQueue, setPlayerQueue] = useState(null)

    function PlayButton(){
    
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
                const id_array = search.map(function(song){
                    return song.id;
                })
                const init_queue = await music.setQueue({songs: id_array, startPlaying: false}); 
                setPlayerQueue(init_queue)
            }
            catch(err){
                console.log(err)
            }   
        }
    
        useEffect(() =>{
            if(search.length !== 0){
                makeQueue()
                console.log("queue made")
            }     
        }, [search])
    
        useEffect(() => {
            if(playerQueue !== null){
                console.log(playerQueue) 
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
    
    function NextButton(){
    
        const next = async () => {
    
        }
    
        return (
            <li className = "nav-item">
                <a href="#" className="next-button" onClick = {next}>
                    <p>Next</p>
                </a>
            </li>
        )
    }

    function BackButton(){

        const back = async () =>{

        }
        return(
            <li className = "nav-item">
                <a href="#" className="back-button" onClick = {back}>
                    <p>Back</p>
                </a>
            </li>
        )
    }

    return(
        <div>
            <PlayButton/>
            <NextButton/>
            <BackButton/>
        </div>
    )

}

export {MusicPlayer};