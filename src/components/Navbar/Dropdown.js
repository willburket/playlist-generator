import React, { useState, useRef, useEffect } from "react";

function GenreNavItem (props) {

    const selected = props.selected;
        
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const dropdownRef = useRef(null);

    function clickChange(){
        
        if (open && active != null){
            setActive(null);
            setOpen(!open);
            
        }
        else{
            setActive(props.value);
            setOpen(!open);
        }       

    };

    useEffect(()=> {
        const pageClickEvent = (e) =>{ 
            if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
                setOpen(false);
            }
        };

        if(active){
            window.addEventListener('click', pageClickEvent);
        }
        
        return () =>{
            window.removeEventListener('click', pageClickEvent);
        }

    }, [active]);

    return (              
            <li className = "nav-item">
            <a href="#" className="icon-button" onClick={() => clickChange()} ref={dropdownRef}>
                {selected === null ? props.icon : selected.name}
            </a>
            {open && props.children}
            </li>
        
    );

}

function DropdownMenu(props){
        
    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}

export { GenreNavItem, DropdownMenu };