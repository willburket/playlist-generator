import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../Navbar/Nav";
import { MusicKitContext } from "../../App";
import { ReactComponent as NextIcon } from "../../assets/images/next.svg"
import { ReactComponent as BackIcon } from "../../assets/images/back.svg"
import { PlayButton, DisplayButton } from "./PlayerButtons";
import CurrentSong from "./CurrentSong";

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







export default MusicPlayer ;