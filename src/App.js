import React, {createContext} from "react";
import {Main} from "./components/Navbar/Navbar";

const MusicKitContext = createContext(null); 
const TokenContext = createContext(null);

class App extends React.Component{

  constructor (props){
    super(props);       
    this.state = {data: null, music: null, token: null};
  }

  componentDidMount(){  
    window.addEventListener('musickitloaded', this.handleEvent);  
  }

  componentWillUnmount(){
    window.removeEventListener('musickitloaded', this.handleEvent);  
  }

  handleEvent = async () => {
    try{                                    
      const response = await fetch('http://localhost:3000/dev/jwt');  //http://localhost:3000/dev/jwt
      const data = await response.json() 
      this.setState({data})  
      const token = data.message.toString()

      await window.MusicKit.configure({
        developerToken: token,   //data.token
        app: {
          name: 'PlaylistGenerator',
          build: '1',
        },
      });
      const music = window.MusicKit.getInstance()
      this.setState({music:music})
      this.setState({token:token})
      console.log("configuration success")
    }
    catch(err){
      console.log(err)
    }
    
  }

  render(){
    return(
      <div data-testid = "app">
      <TokenContext.Provider value={this.state.token}>
      <MusicKitContext.Provider value={this.state.music}>
        <Main/>
      </MusicKitContext.Provider>
      </TokenContext.Provider>
      </div>
    )
  } 
}

export {App, MusicKitContext, TokenContext};

