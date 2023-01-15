import React from "react";
import Navbar from "./Navbar";
import {AppleMusicConfig, AppleMusicAuth} from "./AppleMusicConfig";
import {MusicKitProvider, AuthorizeButton} from "./MusicKitProvider"
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
        console.log("configuration success")
        }
        catch(err){
          console.log(err)
        }
      }).then(() => {
        var music = window.MusicKit.getInstance()
        // music.authorize()
        this.setState({music:music})
      }
      );
  }


  render(){
    return(
      <div>
      <Navbar/>
      <MusicKitProvider value={this.state.music}>
        <AuthorizeButton />
      </MusicKitProvider>
      {/* <AppleMusicConfig/> */}
      {/* <AppleMusicAuth/> */}
      {/* <Submit/> */}
      </div>
    )
  }
  
  
}

export default App;