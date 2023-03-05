import React, {createContext} from "react";
import {Main} from "./components/Navbar/Navbar";

const MusicKitContext = createContext(null); 

class App extends React.Component{

  constructor (props){
    super(props);       // check this 
    this.state = {data: null, music: null};
  }

  componentDidMount(){  
    window.addEventListener('musickitloaded', this.handleEvent);  
    // const muskitElement = document.getElementById("musickit-element");
    // document.addEventListener('musickitloaded', this.handleEvent);
    // muskitElement.addEventListener('musickitloaded', this.handleEvent)

    
  }

  componentWillUnmount(){
    // document.addEventListener('musickitloaded', this.handleEvent);
    window.removeEventListener('musickitloaded', this.handleEvent);  
  }

  handleEvent = async () => {
    console.log("musickitloaded");
    try{                                    // wait for script tag in html to load?
      const response = await fetch('/jwt'); // should be loaded already since musickitloaded event occured
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
        <Main/>
      </MusicKitContext.Provider>
      <div id = "musickit-element"></div>
      </div>
    )
  } 
}

export {App, MusicKitContext};



// handleEvent = async () => {
//   const dev_token = localStorage.getItem('token');
//   try{
//   if(!dev_token){
//     const response = await fetch('/jwt');
//     const data = await response.json() 
//     localStorage.setItem('token', data.token);
//     this.setState({data:data}) 
//   }
//   else{
//     this.setState({data:dev_token})
//   }
//   await window.MusicKit.configure({
//     developerToken: this.state.token,
//     app: {
//       name: 'PlaylistGenerator',
//       build: '1',
//     },
//   });
//   const music = window.MusicKit.getInstance()
//   this.setState({music:music})
//   console.log("configuration success");   
//   }
//   catch(err){
//     console.log(err)
//   }
// }
