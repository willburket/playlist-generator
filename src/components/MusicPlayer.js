import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Navbar";
import { MusicKitContext } from "../App";
import { ReactComponent as PlayIcon} from "../assets/images/play.svg"
import { ReactComponent as PauseIcon} from "../assets/images/pause.svg"
import { ReactComponent as NextIcon} from "../assets/images/next.svg"
import { ReactComponent as BackIcon} from "../assets/images/back.svg"

function MusicPlayer(){
    const search = useContext(SearchContext)
    const music = useContext(MusicKitContext)
    const [playing, setPlaying] = useState(false)       // maybe change this to what song is playing
    const [playerQueue, setPlayerQueue] = useState(null)

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

    useEffect(() => {
        if(search.length !== 0){
            makeQueue()
        }     
    }, [search])

    useEffect(() => {
        if(playerQueue !== null){
        } 
    }, [playerQueue])
      
    function PlayButton(){ 
    
        const play = async () => {     
            try{
                if(!playing){
                    await music.play()      // should this be await?
                    setPlaying(true)
                }
                else{
                    await music.pause()
                    setPlaying(false)
                }
            }
            catch(err){
                console.log(err)
            }            
        }
    
        return(           
                    <a href="#" className="player-button" onClick = {play}>
                        {playing ? <PauseIcon/> : <PlayIcon/>}
                    </a>            
        )
    }
    
    function NextButton(){
    
        const next = async () => {
            try{
                await music.skipToNextItem()   // await causing error

            }
            catch(err){
                console.log(err)
            }
                     
        }

        return (           
                <a href="#" className="player-button" onClick = {next}>
                    <NextIcon/>
                </a>           
        )
    }

    function BackButton(){

        const back = async () =>{
            try{
                await music.skipToPreviousItem()
            }
            catch(err){
                console.log(err)
            }
            
        }

        return(           
                <a href="#" className="player-button" onClick = {back}>
                    <BackIcon/>
                </a>
        )
    }

    return(
        <div className="display-container">
            <div className="display">
                <div className="display-left">
                    <BackButton/>
                    <PlayButton/>
                    <NextButton/>
                </div>
                <div className= "display-right">
                    <CurrentSong/>
                </div>
            

            </div>
            
        </div>
    )
}

function CurrentSong(){
    const music = useContext(MusicKitContext)
    const [song, setSong] = useState(null)
    const [display, setDisplay] = useState(null)

    useEffect(() => {
        if (music) {
          const subscription = music.addEventListener('playbackStateDidChange', () => {
            if(music.isPlaying){
                console.log(music.nowPlayingItem)
                const currentSong = music.nowPlayingItem
                const displayString = `${currentSong.attributes.artistName} - ${currentSong.attributes.name}`
                setSong(currentSong)
                setDisplay(displayString)
            }
            else{
                setSong(null)
            }
            
          });
          return () => {
            music.removeEventListener('playbackStateDidChange', subscription);
          };
        }
      }, [music]);

    return(     
        
        <div>
                <div className="screen">
                    <p>
                        {song !== null ? display: ""}
                    </p>
                </div>      
                <div className="progress">
                    <apple-music-progress></apple-music-progress>
                </div>
            
        </div>
    )
}

export {MusicPlayer};