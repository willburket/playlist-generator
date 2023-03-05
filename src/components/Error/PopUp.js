import React, { useContext, useEffect, useState } from "react";
import { MusicKitContext } from "../../App";
// import { MusicKitContext } from "../../Application";
import { ReactComponent as Account} from '../../assets/images/account.svg'


function PopUp(){
    const music = useContext(MusicKitContext); 
    const [showPopup, setShowPopup] = useState(false);
    
    

    const handleCloseDiv = () => {
        setShowPopup(false)
    }

    useEffect(() =>{
        if(music){
            const isPopupDisplayed = localStorage.getItem('isPopupDisplayed');
            
                const queue_sub = music.addEventListener('queuePositionDidChange', () =>{
                    if(!isPopupDisplayed){
                        if(music.isAuthorized){
                            console.log("apple music authorized");
                            setShowPopup(false);
                        }
                        else{
                            console.log("apple music not authorized");
                            setShowPopup(true);
                            localStorage.setItem('isPopupDisplayed', true)
                        }
                   }
                   else{
                        setShowPopup(false)
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
                <a href = "#" className="icon-button"  id = "popup-button" onClick={handleCloseDiv}>
                    {props.text}
                </a>
            </div>
        );
    }

    
        return(
            <div className="popup-container">
                {showPopup && 
                <div className="popup">
                    <div className="account-container">
                        <Account/>
                    </div>
                    <p>Log into Apple Music to listen to the full song</p>
                    <PopUpButton text = "Ok"/>
                </div>}
            </div>
            
        );
    
}



export default PopUp;