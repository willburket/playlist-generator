import React, { useState, useEffect } from "react";

function Screen(props){
    const song = props.song
    const [display, setDisplay] = useState(null);

        useEffect(() =>{
            if (song !== null){
                const displayString = `${song.attributes.artistName} - ${song.attributes.name}`;
                setDisplay(displayString);
            }
            
        }, [song]);
        
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

export default Screen;