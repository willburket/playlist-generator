import React from "react";

function SearchButton (props){
    const onClick = props.onClick
    
    return(
        <li className = "nav-item">
            <a href="#" className="icon-button" onClick = {onClick} data-testid = "search-button">
                Search
            </a>
        </li>
    );
}

export default SearchButton;