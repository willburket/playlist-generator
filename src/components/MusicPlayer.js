import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./Navbar";
import { MusicKitContext } from "../App";
import { ReactComponent as PlayIcon } from "../assets/images/play.svg"
import { ReactComponent as PauseIcon } from "../assets/images/pause.svg"
import { ReactComponent as NextIcon } from "../assets/images/next.svg"
import { ReactComponent as BackIcon } from "../assets/images/back.svg"

function MusicPlayer(){
    const search = useContext(SearchContext);
    const music = useContext(MusicKitContext);
    const [playing, setPlaying] = useState(false);       

    const makeQueue = async () => {
        try{
            const id_array = search.map(function(song){
                return song.id;
            });
            await music.setQueue({songs: id_array, startPlaying: false});    
           
        }
        catch(err){
            console.log(err);
        }   
    }

    const play = () => {    
        if(search && search.length !== 0){
            if(!playing){
                music.play().catch(error => {console.log(error)});      
            }
            else{
                music.pause().catch(error => {console.log(error)});    
            }                                            
        }               
    }

    const next = () => {
        if(search && search.length !== 0){
            music.skipToNextItem().catch(error => {
                console.log(error)
            });    
        }            
    }

    const back = () =>{
        if(search && search.length !== 0){
            music.skipToPreviousItem().catch(error => {
                console.log(error)
            });
        }
    }

    useEffect(() => {
        if(search && search.length !== 0){    
            makeQueue();
            setPlaying(false);
        }     
    }, [search]);

    useEffect(() => {
        if (music) {                                   
          const subscription = music.addEventListener('playbackStateDidChange', () => {
            if(music.isPlaying){
                setPlaying(true);
            }
            else{
                setPlaying(false);
            }
            
          });
          return () => {
            music.removeEventListener('playbackStateDidChange', subscription);
          };
        }
      }, [music]);

    return(
        <div className="display-container" data-testid = "player">
            <div className="display">
                <div className="display-left">
                    <DisplayButton onClick = {back} icon = {<BackIcon/>}/>
                    <PlayButton onClick = {play} status = {playing}/>
                    <DisplayButton onClick = {next} icon = {<NextIcon/>}/>
                </div>
                <div className= "display-right">
                    <CurrentSong music = {music}/>
                </div>
            </div>
            
        </div>
    );
}

function CurrentSong(props){
    const music = props.music
    const [song, setSong] = useState(null);
    const [display, setDisplay] = useState(null);

        useEffect(() =>{
            if(music){
                const subscription = music.addEventListener('queuePositionDidChange', () =>{
                    const currentSong = music.queue.currentItem;
                    console.log(currentSong);
                    const displayString = `${currentSong.attributes.artistName} - ${currentSong.attributes.name}`;
                    setSong(currentSong);
                    setDisplay(displayString);
                });
    
                return () =>{
                    music.removeEventListener('queuePositionDidChange', subscription);
                }
            }
        }, [music]);
        
    return(             
        <div>
            <div className="screen">
                <p className = "song">
                    {song !== null ? display: ""}
                </p>
            </div>      
            <div className="progress">
                <apple-music-progress></apple-music-progress>
            </div>
        </div>
    );
}

function PlayButton(props){ 

    const playing = props.status;
    const onClick = props.onClick;

    return(           
        <a href="#" className="player-button" onClick = {onClick}>
            {playing ? <PauseIcon/> : <PlayIcon/>}
        </a>            
    );
}

function DisplayButton(props){
    
    return (           
        <a href="#" className="player-button" onClick = {props.onClick}>
            {props.icon}
        </a>           
    );
}



export { MusicPlayer, PlayButton, DisplayButton };