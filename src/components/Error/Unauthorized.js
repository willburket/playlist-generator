import React, { useContext, useEffect, useState } from "react";
import { MusicKitContext } from "../../App";
import { ReactComponent as Account} from '../../assets/images/account.svg'
import { SearchContext } from "../Navbar/Navbar";

function PopUp(){
    const music = useContext(MusicKitContext); 
    const search = useContext(SearchContext);
    const [showPopup, setShowPopup] = useState(false);
    const [firstSearch, setFirstSearch] = useState(true);
    

    const handleCloseDiv = () => {
        setShowPopup(false)
    }

    useEffect(() =>{
        if(music){
            if(firstSearch && !music.isAuthorized){
                const timeout = setTimeout(() => {
                    setShowPopup(true);
                }, 2000);
                setFirstSearch(false);
                return () => clearTimeout(timeout);
            }
        } 
        
       
    }, [search]);

    function PopUpButton(props){

        return(
            <div>
                <div className="icon-button"  id = "popup-button" onClick={handleCloseDiv}>
                    {props.text}
                </div>
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
                    <p>Log into Apple Music for full access</p>
                    <PopUpButton text = "Ok"/>
                </div>}
            </div>
            
        );
    
}



export default PopUp;