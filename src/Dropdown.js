import React from "react";

function DropdownItem(props){
    return(
        <a href="#" className="menu-item">
            <div className="dropdown-button">{props.children}</div>
            
        </a>

    );
}

function DropdownMenu(props){

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
