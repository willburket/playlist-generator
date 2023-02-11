import React, {useEffect, useState, useRef, createContext} from "react";
import { ReactComponent as MusicIcon } from "../assets/music.svg"
import { Main } from "./Main";

const NavbarContext = createContext(null)       // use this to pass picked items to search

function Outline(){
    const [selected, setSelected] = useState(null)
        
    useEffect(() => {
        // console.log(selected)
    }, [selected])

    function Navbar(props){
    
        function GenreDropdownItem(props){
    
            function itemClick (){
                setSelected(props)
            }
        
            return(
                <a href="#" className="menu-item" onClick = {() => itemClick()}>
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
        
        function GenreNavItem (props) {
        
            const [open, setOpen] = useState(false);
            const [active, setActive] = useState(null);
            const dropdownRef = useRef(null);
        
            function clickChange(){
                
                if (open && active != null){
                    setActive(null)
                    setOpen(!open)
                    
                }
                else{
                    
                    setActive(props.value)
                    setOpen(!open)
                }       
        
            };
        
            useEffect(()=> {
                const pageClickEvent = (e) =>{ 
                    if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
                        setOpen(false)
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
        

        // we can make this better 
        return(        
            <nav className= "navbar">
                <ul className= "navbar-nav">
                    <GenreNavItem icon= {<MusicIcon/>} value= "genre">
                        <DropdownMenu>
                            <GenreDropdownItem name = "Pop" value = "pop"/>
                            <GenreDropdownItem name = "Rap" value = "rap"/>
                            <GenreDropdownItem name = "Rock" value = "rock"/>
                            <GenreDropdownItem name = "R&B" value = "r&b"/>
                            <GenreDropdownItem name = "Country" value = "country"/>
                            <GenreDropdownItem name = "Dance" value = "dance"/>
                            <GenreDropdownItem name = "Dubstep" value = "dubstep"/>
                            <GenreDropdownItem name = "Latin" value = "latin"/>
                            <GenreDropdownItem name = "Alternative" value = "alternative"/>
                            <GenreDropdownItem name = "Indie" value = "indie"/>
                            <GenreDropdownItem name = "Raggae" value = "raggae"/>      
                        </DropdownMenu>   
                    </GenreNavItem>
                </ul>
            </nav>  
        );
    
    }

    return(
        <div>
            <Navbar/>
            <NavbarContext.Provider value = {selected}>
                <Main/>
            </NavbarContext.Provider>
        </div>
    );

}

export { Outline, NavbarContext};