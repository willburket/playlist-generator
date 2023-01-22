import React, {useEffect, useState, useRef} from "react";
import {SearchButton} from "./Search";

var genre = null        
var category = null
var decade = null

function GenreDropdownItem(props){

    // const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        genre = props
        console.log(genre)
    }

    return(
        <a href="#" className="menu-item" onClick = {() => itemClick()}>
            <div className="dropdown-button">
                {props.name} 
            </div>
        </a>
    );
}

function CategoryDropdownItem(props){

    // const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        category = props
        console.log(category)
    }

    return(
        <a href="#" className="menu-item" onClick={() => itemClick()}>
            <div className="dropdown-button">
                {props.name} 
            </div>
        </a>
    );
}

function DecadeDropdownItem(props){

    // const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        decade = props
        console.log(decade)
    }

    return(
        <a href="#" className="menu-item" onClick={() => itemClick()}>
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

function CategoryNavItem (props) {

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
                {category === null ? props.icon : category.name}
            </a>
            {open && props.children}
        </li>
    );

}

function DecadeNavItem (props) {

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
                {decade === null ? props.icon : decade.name}
            </a>
            {open && props.children}
        </li>
    );

}

function SubmitButton (props){

    return(
        <li className = "nav-item">
            <a href="#" className="icon-button">
                Submit
            </a>
        </li>
    );
}

function Navbar(props){

    return(
        <nav className= "navbar">
            <ul className= "navbar-nav">
                <GenreNavItem icon= "Genre 😀" value= "genre">
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
                <CategoryNavItem icon= "Category 😀" value= "category">
                    <DropdownMenu>
                        <CategoryDropdownItem name = "Top Songs" value = "top"/>
                        <CategoryDropdownItem name = "Top Artists" value = "artists"/>
                        <CategoryDropdownItem name = "Random" value = "random"/>
                        <CategoryDropdownItem name = "Other" value = "other" />  
                    </DropdownMenu>
                </CategoryNavItem>
                <DecadeNavItem icon= "Years 😀" value= "years">
                    <DropdownMenu>
                        <DecadeDropdownItem name = "This Year" value = "now"/>
                        <DecadeDropdownItem name = "2020's" value = "2020"/>
                        <DecadeDropdownItem name = "2010's" value = "2010"/>
                        <DecadeDropdownItem name = "2000's" value = "2000" />  
                        <DecadeDropdownItem name = "1990's" value = "1990" />  
                        <DecadeDropdownItem name = "1980's" value = "1980" />  
                        <DecadeDropdownItem name = "1970's" value = "1970" />  
                        <DecadeDropdownItem name = "1960's" value = "1960" />  
                    </DropdownMenu>
                </DecadeNavItem>
                <SearchButton />
                {/* <SubmitButton/> */}
            </ul>
        </nav>
    );

}

export default Navbar