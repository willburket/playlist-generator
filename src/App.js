import React from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import DropdownMenu from "./Dropdown";


function App(){
  return(
    <Navbar>
      <NavItem icon= "😀"/>
      <NavItem icon= "😀"/>
      <NavItem icon= "😀"/>
      <NavItem icon="😘"> 
        <DropdownMenu>
          <p> Rock </p> 
          <p> Rap </p>
          <p> Pop </p>
        </DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

export default App;