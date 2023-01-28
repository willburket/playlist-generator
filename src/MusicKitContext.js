import React, { createContext, useState, useContext } from 'react'

const MusicKitContext = createContext(null);        // might just move this to app.js & name this file auth button

function AuthorizeButton(){             
    const music = useContext(MusicKitContext);
    // probably need to make this a custom hook so other components can use that hook
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
            // need to add code for a popup or something when theres an error
            // maybe don't let login button pop up till musickit instance is available??
        }
    }

    return(
    <div>
        <a href="#" className="login-button" onClick = {handleStatusChange}>
            {isAuthorized ? 'Log Out' : 'Log In'}
        </a>
    </div>
    );

}

export {MusicKitContext, AuthorizeButton}