import React, { useContext, useEffect, useState } from "react";
// import { SearchContext } from "../Navbar/Navbar";
import { SearchContext } from "../Navbar/Main";
import { MusicKitContext } from "../../App";
// import { MusicKitContext } from "../../Application";
import { ReactComponent as NextIcon } from "../../assets/images/next.svg"
import { ReactComponent as BackIcon } from "../../assets/images/back.svg"
import { PlayButton, DisplayButton } from "./PlayerButtons";
import Screen from "./Screen";
import NowPlaying from "./NowPlaying";
// import { makeQueue, play, next, back } from "../../services/MusicPlayer";

function Player(){
    const search = useContext(SearchContext);
    const music = useContext(MusicKitContext);
    const [playing, setPlaying] = useState(false);  
    const [song, setSong] = useState(null);
    
    

    const makeQueue = async () => {
        try{
            const id_array = search.map(function(song){
                return song.id;
            });
            await music.setQueue({songs: id_array, startPlaying: false});  
            //console.log(search);
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

    useEffect(() => {
        if(music){
            const subscription = music.addEventListener('queuePositionDidChange', () =>{      
                const currentSong = music.queue.currentItem;
                setSong(currentSong);
            });

            return () =>{
                music.removeEventListener('queuePositionDidChange', subscription);
            }
        }
    }, [music]);

    return(
        <div className="display-container" data-testid = "player">
            <div className="display">
                <div className="display-left">
                    <div className= "back-icon">
                    <DisplayButton onClick = {back} icon = {<BackIcon/>}/>
                    </div>
                    <PlayButton onClick = {play} status = {playing} data-testid = "play-button"/>
                    <DisplayButton onClick = {next} icon = {<NextIcon/>}/>
                </div>
                <div className="display-center">
                    <NowPlaying music = {music} song = {song}/>
                </div>
                <div className= "display-right">
                    <Screen music = {music} song = {song}/>
                </div>
            </div>
            
        </div>
    );
}

export default Player;