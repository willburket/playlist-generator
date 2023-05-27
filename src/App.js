import React, {createContext} from "react";
import {Main} from "./components/Navbar/Navbar";

const MusicKitContext = createContext(null); 

class App extends React.Component{

  constructor (props){
    super(props);       
    this.state = {data: null, music: null};
  }

  componentDidMount(){  
    window.addEventListener('musickitloaded', this.handleEvent);  
  }

  componentWillUnmount(){
    window.removeEventListener('musickitloaded', this.handleEvent);  
  }

  handleEvent = async () => {
    try{                                    
      const response = await fetch('https://c4827fb67a.execute-api.us-east-1.amazonaws.com/dev/jwt'); 
      const data = await response.json() 
      this.setState({data})  
      await window.MusicKit.configure({
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
  }

  render(){
    return(
      <div data-testid = "app">
      <MusicKitContext.Provider value={this.state.music}>
        <Main/>
      </MusicKitContext.Provider>
      </div>
    )
  } 
}

export {App, MusicKitContext};

