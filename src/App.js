import React from "react";
import {MusicKitContext, AuthorizeButton} from "./components/MusicKitContext"
import {Outline} from "./components/Navbar";

class App extends React.Component{

  constructor (props){
    super(props);       // check this 
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
          const response = await fetch('/jwt');
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
      <div>
      <MusicKitContext.Provider value={this.state.music}>
        <AuthorizeButton/>
        <Outline/>
      </MusicKitContext.Provider>
      </div>
    )
  } 
}

export default App;

