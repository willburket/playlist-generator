import React, {useState} from "react";

const genres = [{value:'pop', label:'Pop'},
                {value:'rap', label:'Hip-Hop/Rap'}, 
                {value:'rock', label:'Rock'}, 
                {value:'r&b', label:'R&B'}, 
                {value:'dance', label:'Dance'}, 
                {value:'country', label:'Country'}, 
                {value:'alternative', label:'Alternative'}, 
                {value:'latin', label:'Latin'}, 
                {value:'soul', label:'Soul/Funk'}, 
                {value:'r&b', label:'R&B'}, 
                {value:'jazz', label:'Jazz'}, 
                ];

const categories = [{value: 'top', label: 'Top Songs'}];

function NavItem (props) {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);

    function openOne(props){
        setOpen(!open)
        setActive(props.value)
        //code for closing other navitems?
    }


    return (
        <li className = "nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}

        </li>
    );

}

export default NavItem