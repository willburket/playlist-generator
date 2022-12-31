import React, { useState, useEffect } from 'react';

let token = null

function AppleMusicToken() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/jwt');     // will need to switch to using cookie eventually
      const json = await response.json();
      setData(json);
      token = data
    }
    fetchData();    
  }, []);
  
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

function AppleMusicConfig(){
  useEffect(() => {
    if (token != null){
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
  return(
    <div>
      <p>{token}</p>
    </div>
  )
  }
}

export {AppleMusicConfig, AppleMusicToken};

// const music = window.MusicKit.getInstance()
      // // await music.authorize();
  
      // // testing music
      
  
      // const queryParameters = { ids: ['1233456789', '987654321'], l: 'en-us' };
      // const result = await music.api.music(`/v1/catalog/{{storefrontId}}/activities`, queryParameters);
      // console.log(result)
      