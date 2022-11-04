import React, {useEffect, useState, useRef} from "react";

var genre = null
var category = null

function GenreDropdownItem(props){

    const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        genre = props.value
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

    const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        category = props.value
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

function DropdownMenu(props){

    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}


function NavItem (props) {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const dropdownRef = useRef(null);
    

    function clickChange(){

        //console.log(active)
        
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
            //console.log(e)
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
            <a href="#" className="icon-button" onClick={() => clickChange()} ref = {dropdownRef}>
                {props.icon}
            </a>
            {open && props.children}
        </li>
    );

}

function Navbar(props){

    
    return(
        <nav className= "navbar">
            <ul className= "navbar-nav">

                <NavItem icon= "Genre 😀" value= "genre">
                    
                    <DropdownMenu>
                        <GenreDropdownItem name = "Rap" value = "rap"/>
                        <GenreDropdownItem name = "Pop" value = "pop"/>
                    </DropdownMenu>
                     
                </NavItem>
            
                <NavItem icon= "Category 😀" value= "category">
                    <DropdownMenu>
                        <CategoryDropdownItem name = "Top Songs" value = "top"/>
                            
                                        {/*do some sort of 'set selected' onclick event */}
                        <CategoryDropdownItem name = "Other" value = "other" />
                        
                    </DropdownMenu>
                </NavItem>
            </ul>
        </nav>
    );

}



export default Navbar