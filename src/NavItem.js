import React, {useState} from "react";

function NavItem (props) {

    const [open, setOpen] = useState(false);

    return (
        <li className = "nav-tem">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}

        </li>
    );

}

export default NavItem