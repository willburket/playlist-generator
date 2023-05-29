import React, { useContext, useEffect, useState } from "react";
import { MusicKitContext } from "../../App";
// import { MusicKitContext } from "../../Application";
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
                setShowPopup(true);
                setFirstSearch(false);
            }
        } 
       
    }, [search]);

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
                    <p>Log into Apple Music for full access</p>
                    <PopUpButton text = "Ok" onClick = {handleCloseDiv}/>
                </div>}
            </div>
            
        );
    
}



export default PopUp;