import React, { createContext, useState, useContext } from 'react'

const MusicKitContext = createContext(null);

function AuthorizeButton(){
    const music = useContext(MusicKitContext);

    const [isAuthorized, setIsAuthorized] = useState(false)    
    
        
    function handleStatusChange(){
    if (isAuthorized == false){
    music.authorize()
    }
    else{
    music.unauthorize()
    }
    setIsAuthorized(!isAuthorized)
    }
    // make button change to say unauthorize/log out eventually

    return(
    <div>
    <button onClick = {handleStatusChange}>
        Authorize
    </button>
    </div>
    );

}

export {MusicKitContext, AuthorizeButton}