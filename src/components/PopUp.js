import React, { useContext,useEffect } from "react";
import { MusicKitContext } from "../App";

function PopUp(){
    const music = useContext(MusicKitContext);

    useEffect(() =>{
        if(music){
            const subscription = music.addEventListener('queuePositionDidChange', () =>{
                if(music.isAuthorized){
                    console.log("apple music authorized")
                }
                else{
                    console.log("apple music not authorized")
                }
            });
        
        return () =>{
            music.removeEventListener('queuePositionDidChange', subscription);

        }
    }

    }, [music]);

    return(
        <div> </div>
    );
}

export default PopUp;