import React, { createContext, useState, useContext } from 'react'
import {MusicKitContext} from "../App"

function AuthButton(){             
    const music = useContext(MusicKitContext);
    
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

    return(
    <div className='nav-item'>
        <a href="#" className="icon-button" onClick = {handleStatusChange}>
            {isAuthorized ? 'Log Out' : 'Log In'}
        </a>
    </div>
    );

}

export { AuthButton }