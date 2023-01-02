import React from "react";
import Navbar from "./Navbar";
import {AppleMusicConfig, AppleConfig} from "./AppleMusicConfig";
// import Submit from "./AppleMusic";

function App(){
  return(
    <div>
    <Navbar/>
    <AppleConfig />
    {/* <AppleMusicConfig/> */}
    {/* <Submit/> */}
    </div>
  );
}

export default App;