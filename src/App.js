import React from "react";
import Navbar from "./Navbar";
import {AppleMusicConfig, AppleMusicToken}from "./AppleMusicConfig";
// import Submit from "./AppleMusic";

function App(){
  return(
    <div>
    <Navbar/>
    <AppleMusicToken />
    <AppleMusicConfig/>
    {/* <Submit/> */}
    </div>
  );
}

export default App;