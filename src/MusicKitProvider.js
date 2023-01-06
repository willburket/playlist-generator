import React, { useState, useContext } from 'react'

const MusicKitContext = React.createContext();

function MusicKitProvider (props){
    const {children, musicKit} = props;
    
    return(
        <MusicKitContext.Provider value = {musicKit}>
            {children}
        </MusicKitContext.Provider>
    )
}

function AuthorizeButton(){
    const musicKit = useContext(MusicKitContext);

    const [isAuthorized, setIsAuthorized] = useState(false)
    var music = musicKit
        
    function handleStatusChange(){
    if (isAuthorized == false){
    music.authorize()
    }
    else{
    music.unauthorize()
    }
    setIsAuthorized(!isAuthorized)
    }


    return(
    <div>
    <button onClick = {handleStatusChange}>
        Authorize
    </button>
    </div>
    );

}

export {MusicKitProvider, AuthorizeButton}