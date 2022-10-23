import React, {useEffect, useState} from "react";

function DropdownItem(props){

    // const [selected, setSelected ] = useState(false);

    return(
        <a href="#" className="menu-item">
            <div className="dropdown-button">{props.name} 
            {/* {selected.toString()}    */}
            </div>
        </a>
    );
}

function DropdownMenu(props){
       

    function DropdownItem(props){

        const [selected, setSelected ] = useState(false);
    
        return(
            <a href="#" className="menu-item">
                <div className="dropdown-button" >{props.name} 
                {/* {selected.toString()}    */}
                </div>
            </a>
        );
    }

    // code for what happens when a dropdownitem is picked 

    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}


function NavItem (props) {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('null');

    function clickChange(){
        setOpen(!open)
        setActive(props.value)
        console.log(active)
        
    };

    
    
    
    return (
        <li className = "nav-item">
            <a href="#" className="icon-button" onClick={() => clickChange()}>
                {props.icon}
            </a>

            {open && props.children}

        </li>
    );

}

function Navbar(props){
    const [active, setActive] = useState("null");
    const [selected_category, setSelectedCat] = useState('null')

    useEffect(() => {
        console.log(`${selected_category}`)
    });
    
    return(
        <nav className= "navbar">
            <ul className= "navbar-nav">{props.children}</ul>
            <NavItem icon= "Genre 😀" value= "genre" onClick={()=> setActive(active="genre")}>
        
            </NavItem>
                
            <NavItem icon= "Category 😀" value= "category" onClick={()=> setActive(active="category")}>
            <DropdownMenu>
                    
                    <DropdownItem name = "Top Songs" onClick={() => setSelectedCat('top')}/>
                        
                                     {/*do some sort of 'set selected' onclick event */}
                    <DropdownItem name = "Other" onClick={()=> Object.assign()}/>
                    {selected_category}
                </DropdownMenu>
            </NavItem>
        </nav>
    );

}



export default Navbar