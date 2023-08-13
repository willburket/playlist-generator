import React, { useEffect, useState } from 'react'
import { fetchProfile } from '../../services/MusicApi';

function Auth(props){             
   // const music = window.MusicKit.getInstance()
    const music = props.music
    const [isAuthorized, setIsAuthorized] = useState(false)

    async function handleStatusChange(){
        try{
            if (isAuthorized === false){               
                await music.authorize();
                
                // loader with "creating user profile"
                // const profile = await fetchProfile();
                // console.log(profile)
                // save to session storage 

            }
            else{
                await music.unauthorize();
            }
            setIsAuthorized(!isAuthorized);
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
