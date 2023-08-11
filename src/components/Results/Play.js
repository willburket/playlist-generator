import React, { useState, useEffect } from "react";
import { ReactComponent as PlayIcon} from "../../assets/images/play-circle.svg";  
import { ReactComponent as PauseIcon} from "../../assets/images/pause-circle.svg";  
import { playItem } from "../../services/MusicApi";

function Play(props){
    const song = props.song;
    const index = props.index;
    const queue = props.queue;
    const music = window.MusicKit.getInstance();

    const [playing,setPlaying] = useState(false);

    useEffect(() => {
        
        if(music){
            const subscription = music.addEventListener('queuePositionDidChange', () =>{      // change icon on queue change
                const currentSong = music.queue.currentItem;
                
                if (currentSong.id === song.id){
                    setPlaying(true)
                }
                else{
                    setPlaying(false)
                }
            });

            return () =>{
                music.removeEventListener('queuePositionDidChange', subscription);
            }
        }
    }, [music]);

    useEffect(() => {
        if (music) {              
            const subscription = music.addEventListener('playbackStateDidChange', () => {   // change icon on playback state 
            const currentSong = music.queue.currentItem;  
            if(music.isPlaying && currentSong.id === song.id){
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

    const playClick = async () => {
        playItem(index, queue);
    }

    const pauseClick = () =>{
        music.pause().catch(error => {console.log(error)});
    }


    
    

    return(
    <div className="play-container">
        <div className="grid-button" >
            {playing ? <PauseIcon onClick = {pauseClick}/> : <PlayIcon onClick = {playClick}/>}
        </div>
    </div>
    );
}

export default Play;