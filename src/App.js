import React from "react";
import Navbar from "./Navbar";
import {AppleMusicConfig, AppleMusicAuth} from "./AppleMusicConfig";
import {MusicKitContext, AuthorizeButton} from "./MusicKitContext"
// import { useState, useEffect } from "react";


class App extends React.Component{

  constructor (props){
    super(props);       // check this 
    this.state = {data: null, music: null};
  }

  componentDidMount(){
      fetch('/jwt')
      .then(response => response.json())
      .then(data => {
        this.setState({data})
        try{
          window.MusicKit.configure({
            developerToken: data.token,
            app: {
              name: 'PlaylistGenerator',
              build: '1',
            },
          });
          const music = window.MusicKit.getInstance()
          this.setState({music:music})
          console.log("configuration success")
        }
        catch(err){
          console.log(err)
        }
      });
     
  }

  // add a component did unmount method


  render(){
    return(
      <div>
      <Navbar/>
      <MusicKitContext.Provider value={this.state.music}>
        <AuthorizeButton />
      </MusicKitContext.Provider>
      {/* <AppleMusicConfig/> */}
      {/* <AppleMusicAuth/> */}
      {/* <Submit/> */}
      </div>
    )
  }
  
  
}

export default App;