import React, { useEffect } from 'react'

function AuthButton(props){             
    const music = props.music;
    const onClick = props.onClick;
    let isAuthorized = props.auth;
    
    useEffect(() => {
        if(music){
            isAuthorized = music.isAuthorized;
        }
        
    }, [music]); 
        


    return(
        <div className='nav-item'>
            <a href="#" className="icon-button" onClick = {onClick} data-testid = "auth-button">
                {isAuthorized ? 'Log Out' : 'Log In'}
            </a>
        </div>
    );

}


export default AuthButton;
