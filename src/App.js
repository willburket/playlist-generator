import React from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import {DropdownMenu, DropdownItem} from "./Dropdown";


function App(){
  return(
    <Navbar>
      <NavItem icon= "Genre 😀">
        <DropdownMenu>
          <DropdownItem name = "Pop"/>
          <DropdownItem name = "Hip-Hop/Rap"/>
          <DropdownItem name = "Rock"/>
          <DropdownItem name = "R&B"/>
          <DropdownItem name = "Dance"/>
          <DropdownItem name = "Country"/>
          <DropdownItem name = "Alternative"/>
          <DropdownItem name = "Latin"/>
          <DropdownItem name = "Soul/Funk"/>
          <DropdownItem name = "Jazz"/>
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