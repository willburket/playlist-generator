import React, { useState, useRef, useEffect } from "react";

function GenreDropdownItem(props){
    const onClick = props.onClick;

    return(
        <a href="#" className = "menu-item" onClick = {onClick}>
            <div className="dropdown-button">
                {props.name} 
            </div>
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

export { GenreDropdownItem, DropdownMenu };