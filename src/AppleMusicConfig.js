import React, { useState, useEffect } from 'react';

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

  document.addEventListener('musickitloaded', async function () {
    const dev_token = data.token
    // Call configure() to configure an instance of MusicKit on the Web.
    try {
      await window.MusicKit.configure({
        developerToken: dev_token,
        app: {
          name: 'PlaylistGenerator',
          build: '1',
        },
      });
    } catch (err) {
      // Handle configuration error
     console.log(err)
    }
  
    // MusicKit instance is available
    const music = window.MusicKit.getInstance()
    // await music.authorize();
    const result = await music.api.music(
        `/v1/catalog/us/search`,
        { term: 'gunna', types: 'albums'}
      );
    
    console.log(result)
    // await music.play();
  });

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

export default AppleMusicConfig;