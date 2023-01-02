import React, { useState, useEffect } from 'react';

let token = null

function AppleMusicConfig() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/jwt');     // will need to switch to using cookie eventually
      const json = await response.json();
      setData(json);
      
    }
    fetchData();    
  }, []);

  useEffect(() => {
    if (data){
      document.addEventListener('musickitloaded', config);
        // MusicKit instance is available
        // const music = window.MusicKit.getInstance()
    }
    return () => {
      document.removeEventListener('musickitloaded', config)
    }
  }, []);

  async function config() {
    // const dev_token = data.token
    // Call configure() to configure an instance of MusicKit on the Web.
    try {
      await window.MusicKit.configure({
        developerToken: token,
        app: {
          name: 'PlaylistGenerator',
          build: '1',
        },
      });
    } catch (err) {
      // Handle configuration error
     console.log(err)
    }
    
  }
  
  if (!data) {
    return <p>Loading...</p>;
  }
  else{  
    return (
        <div>
          <p>Received data {data.token} </p>
        </div>
      );
  }
  
}

class AppleConfig extends React.Component{
  constructor (props){
    super(props);
    this.state = {data: null};
    this.configure = this.configure.bind(this);
  }

  componentDidMount(){
    fetch('/jwt')
      .then(response => response.json())
      .then(data => {
        this.setState({data})
        document.addEventListener('musickitloaded', this.configure)
      });
    ;
  }

  componentWillUnmount(){
    document.removeEventListener('musickitloaded', this.configure);

  }

  configure(){
    // const dev_token = data.token
    // Call configure() to configure an instance of MusicKit on the Web.
    try {
        window.MusicKit.configure({
        developerToken: this.state.data.token,
        app: {
          name: 'PlaylistGenerator',
          build: '1',
        },
      });
      console.log("musickit configured")
    } catch (err) {
      // Handle configuration error
     console.log(err)
    }
}

  render(){
      if (!this.state.data) {
        return <p>Loading...</p>;
      }
      else{  
        return (
            <div>
              <p>Received data {this.state.data.token} </p>
            </div>
          );
      }
    
  }

}


export {AppleMusicConfig, AppleConfig};

// const music = window.MusicKit.getInstance()
      // // await music.authorize();
  
      // // testing music
      
  
      // const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
      // const result = await music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
      // console.log(result)
      