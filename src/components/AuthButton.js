import React, { useState, useContext, useEffect } from 'react'
import {MusicKitContext} from "../App"

function AuthButton(){             
    const music = useContext(MusicKitContext);
    
    
    const [isAuthorized, setIsAuthorized] = useState(false); 
    
    // useEffect(() => {
    //     if (music) {                                  
    //       const subscription = music.addEventListener('authorizationStatusDidChange', () => {
    //         console.log("auth changed")
            
            
    //       });
    //       return () => {
    //         music.removeEventListener('authorizationStatusDidChange', subscription);
    //       };
    //     }
    //   }, [music]);
    useEffect(() => {

    }, [music])
        
    async function handleStatusChange(){
        try{
            if (music.isAuthorized === false){               
                await music.authorize();
                // setIsAuthorized(true)
            }
            else{
                await music.unauthorize();
                // setIsAuthorized(false)
            }
            setIsAuthorized(!isAuthorized);
            
        }
        catch(err){
            console.log(err);
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

export { AuthButton };