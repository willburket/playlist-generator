import React, { useEffect, useState } from 'react'
import { fetchProfile } from '../../services/MusicApi';
import { profileToCache, cacheCreate } from '../../services/Cache';

function Auth(props){             
    const music = props.music       // can just use context? want to use callback for loader
    const [isAuthorized, setIsAuthorized] = useState(false)

    async function handleStatusChange(){
        try{
            setIsAuthorized(!isAuthorized);
            if (isAuthorized === false){               
                await music.authorize();
                
                // loader with "creating user profile"
                const profile = await fetchProfile();
                const songs = profile.message;
                profileToCache(songs)
            }
            else{
                await music.unauthorize();
                cacheCreate()   // clears cache by creating new empty cache
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        if(music){
            setIsAuthorized(music.isAuthorized);
        }
        
    }, [music]); 
        
    return(
        <div className='nav-item'>
            <div className="icon-button" value = {isAuthorized} onClick = {handleStatusChange} data-testid = "auth-button">
                {isAuthorized ? 'Log Out' : 'Log In'}
            </div>
        </div>
    );

}

export default Auth;