import React, { createContext, useState, useContext } from 'react'

const MusicKitContext = createContext(null);

function AuthorizeButton(){
    const music = useContext(MusicKitContext);

    // probably need to make this a custom hook so other components can access it
    const [isAuthorized, setIsAuthorized] = useState(false)    
        
    async function handleStatusChange(){
        try{
            if (isAuthorized === false){               
                await music.authorize()
            }
            else{
                await music.unauthorize()
            }
            setIsAuthorized(!isAuthorized)
        }
        catch(err){
            console.log(err)
        }
        
    }
    // make button change to say unauthorize/log out eventually

    return(
    <div>
        <a href="#" className="icon-button" onClick = {handleStatusChange}>
            Log In
        </a>
    </div>
    );

}

export {MusicKitContext, AuthorizeButton}