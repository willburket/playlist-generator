import React from "react";
import Navbar from "./Navbar";
import {AppleMusicConfig, AppleMusicAuth} from "./AppleMusicConfig";
// import Submit from "./AppleMusic";

function App(){
  return(
    <div>
    <Navbar/>
    <AppleMusicConfig/>
    {/* <AppleMusicAuth/> */}
    {/* <Submit/> */}
    </div>
  );
}

export default App;