import React from "react";
import Navbar from "./Navbar";
import {MusicKitContext, AuthorizeButton} from "./MusicKitContext"
import SearchButton from "./Search";

class App extends React.Component{

  constructor (props){
    super(props);       // check this 
    this.state = {data: null, music: null};
  }

  componentDidMount(){        // switch back to async eventually and add event listener
      fetch('/jwt')           // store in cookies eventually 
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
      <MusicKitContext.Provider value={this.state.music}>
        <Navbar/>
        <AuthorizeButton />
        {/* <SearchButton /> */}
      </MusicKitContext.Provider>
      </div>
    )
  }
  
  
}

export default App;