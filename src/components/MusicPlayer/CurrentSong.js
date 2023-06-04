import React, { useState, useEffect } from "react";

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

export default CurrentSong;