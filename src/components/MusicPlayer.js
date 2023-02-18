import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Main";
import { MusicKitContext } from "./MusicKitContext";
import { ReactComponent as PlayIcon} from "../assets/play.svg"
import { ReactComponent as PauseIcon} from "../assets/pause.svg"

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
            if(!playing){
                await music.play()      // should this be await?
                setPlaying(true)
            }
            else{
                await music.pause()
                setPlaying(false)
            }
        }
    
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
            await music.skipToNextItem()            // await causing error
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
            await music.skipToPreviousItem()
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
            <CurrentSong/>
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
        <div className="progress">
            <p>
                {song !== null ? display: ""}
            </p>
            <apple-music-progress></apple-music-progress>
        </div>
    )
}

export {MusicPlayer};