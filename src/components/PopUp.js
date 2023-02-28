import React, { useContext, useEffect, useState } from "react";
import { MusicKitContext } from "../App";


function PopUp(){
    const music = useContext(MusicKitContext); 
    const [showPopup, setShowPopup] = useState(false)

    const handleCloseDiv = () => {
        setShowPopup(false)
    }

    useEffect(() =>{
        if(music){
            const queue_sub = music.addEventListener('queuePositionDidChange', () =>{
                if(music.isAuthorized){
                    console.log("apple music authorized");
                    setShowPopup(false);
                }
                else{
                    console.log("apple music not authorized");
                    setShowPopup(true);
                }
            });
            const auth_sub = music.addEventListener('authorizationStatusDidChange', () =>{
                if(music.isAuthorized){             //combine?
                    setShowPopup(false)
                }
            });

        
        return () =>{
            music.removeEventListener('queuePositionDidChange', queue_sub);
            music.removeEventListener('authorizationStateDidChange', auth_sub);
        }
    }

    }, [music]);

    function PopUpButton(props){

        return(
            <div>
                <a href = "#" className="icon-button" onClick={handleCloseDiv}>
                    {props.text}
                </a>
            </div>
        );
    }

    
        return(
            <div className="popup-container">
                {showPopup && 
                <div className="popup">
                    <p>Not Signed In</p>
                    <PopUpButton text = "Ok"/>
                </div>}
            </div>
            
        );
    
}



export default PopUp;