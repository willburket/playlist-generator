import React, {useEffect, useState, useRef} from "react";

function DropdownItem(props){

    const[selected_item,setSelectedItem] = useState(null)

    function itemClick (){
        
    }

    return(
        <a href="#" className="menu-item" >
            <div className="dropdown-button">
                {props.name} 
            </div>
        </a>
    );
}

function useActiveMenu(menu){
    const [active_menu, setActiveMenu] = useState(null);

    function handleStatusChange(status) {
        setActiveMenu(status.value);
      }
    
    useEffect(() => {
        
    })

    return(active_menu)  
}

function DropdownMenu(props){

    

    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}

function Dropdown(props){


    return (
        <div className="dropdown">
            {props.children}
        </div>
    );

}


function NavItem (props) {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const dropdownRef = useRef(null)
    

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
                        <DropdownItem name = "Rap" value = "rap"/>
                        <DropdownItem name = "Pop" value = "pop"/>
                    </DropdownMenu>
                    
                    
                </NavItem>
            
            
                
            <NavItem icon= "Category 😀" value= "category">
            <DropdownMenu>
                    
                    <DropdownItem name = "Top Songs" value = "top"/>
                        
                                     {/*do some sort of 'set selected' onclick event */}
                    <DropdownItem name = "Other" value = "other" onClick={()=> Object.assign()}/>
                    
                </DropdownMenu>
            </NavItem>
            </ul>
        </nav>
    );

}



export default Navbar