import React from "react";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import DropdownMenu from "./Dropdown";


function App(){
  return(
    <Navbar>
      <NavItem icon= "Genre 😀"/>
      <NavItem icon= "Category 😀"/>
      <NavItem icon= "Time Frame 😀"/>
      <NavItem icon="Number of Items 😘"> 

      </NavItem>
    </Navbar>
  );
}

export default App;