import React, { useState } from "react";




function DropdownItem(props){


    return(
        <a href="#" className="menu-item">
            <div className="dropdown-button" >{props.name} 
            
            </div>
        </a>
    );
}

function DropdownMenu(props){
    const [picked, setPicked] = useState("")    

    function DropdownItem(props){

        const [selected, setSelected ] = useState(false);
    
        return(
            <a href="#" className="menu-item">
                <div className="dropdown-button" onClick={()=> setSelected(true)}>{props.name} 
                
                </div>
            </a>
        );
    }

    // code for what happens when a dropdownitem is picked 

    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}



export {
    DropdownMenu,
    DropdownItem,
}
