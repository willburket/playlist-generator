import React from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import {DropdownMenu, DropdownItem} from "./Dropdown";


function App(){
  return(
    <Navbar>
      <NavItem icon= "Genre 😀">
        <DropdownMenu>
          <DropdownItem>Pop</DropdownItem>
          <DropdownItem>Hip-Hop/Rap</DropdownItem>
          <DropdownItem>Rock</DropdownItem>
          <DropdownItem>R&B</DropdownItem>
          <DropdownItem>House</DropdownItem>
          <DropdownItem>EDM</DropdownItem>
          <DropdownItem>Country</DropdownItem>
          <DropdownItem>Alternative</DropdownItem>
          <DropdownItem>Punk</DropdownItem>
          <DropdownItem>Classic Rock</DropdownItem>
          <DropdownItem>Hard Rock</DropdownItem>
          <DropdownItem>Latin</DropdownItem>
          <DropdownItem>Soul/Funk</DropdownItem>
          <DropdownItem>Jazz</DropdownItem>
        </DropdownMenu>
      </NavItem>
      <NavItem icon= "Category 😀"/>
      <NavItem icon= "Time Frame 😀"/>
      <NavItem icon="Number of Items 😘"/> 
        
    </Navbar>
  );
}

export default App;