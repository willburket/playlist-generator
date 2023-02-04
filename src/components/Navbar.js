import React, {useEffect, useState, useRef, createContext} from "react";
import { ReactComponent as MusicIcon } from "../assets/music.svg"

let genre = null        // gonna need to change these

const NavbarContext = createContext(null)       // use this to pass picked items to search

function GenreDropdownItem(props){

    const[selectedGenre,setSelectedGenre] = useState(null)

    function itemClick (){
        genre = props
        setSelectedGenre(genre)
        // console.log(genre)
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
                {genre === null ? props.icon : genre.name}
            </a>
            {open && props.children}
        </li>
    );

}


function Navbar(props){

    return(
        <div>
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
        </div>
        
    );

}

export default Navbar