import React from "react";

function SearchButton (props){
    const onClick = props.onClick
    
    return(
        <li className = "nav-item">
            <div className="icon-button" onClick = {onClick} data-testid = "search-button">
                Search
            </div>
        </li>
    );
}

export default SearchButton;