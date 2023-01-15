import React, { createContext, useState, useContext } from 'react'

const MusicKitContext = createContext(null);

function MusicKitProvider (props){
    const {children, music} = props;
    
    
    return(
        <MusicKitContext.Provider value = {music}>
            {children}
        </MusicKitContext.Provider>
    )
}

function AuthorizeButton(){
    var music = useContext(MusicKitContext);

    const [isAuthorized, setIsAuthorized] = useState(false)     //might need to make this a custom hook eventually
    
        
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