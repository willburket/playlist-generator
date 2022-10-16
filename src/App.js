import React from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import {DropdownMenu, DropdownItem} from "./Dropdown";


function App(){
  return(
    <Navbar>
      <NavItem icon= "Genre 😀">
        <DropdownMenu>
        </DropdownMenu>
      </NavItem>
      <NavItem icon= "Category 😀">
        <DropdownMenu>
        <DropdownItem name = "Top Songs"/>
        <DropdownItem name = "Other"/>
        </DropdownMenu>
      </NavItem>
      <NavItem icon= "Time Frame 😀">
        <DropdownMenu> 
        <DropdownItem name = "Current"/>  {/*should probably just make this a form instead where users input start and end year*/}
        <DropdownItem name = "2020's"/>
        <DropdownItem name = "2010's"/>
        <DropdownItem name = "2000's"/>
        <DropdownItem name = "1990's"/>
        <DropdownItem name = "1980's"/>
        <DropdownItem name = "1970's"/>
        <DropdownItem name = "1960's"/>
        </DropdownMenu>
      </NavItem>
      <NavItem icon="Number of Items 😘"></NavItem>
        
    </Navbar>
  );
}

export default App;