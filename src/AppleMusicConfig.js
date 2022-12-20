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
    // Call configure() to configure an instance of MusicKit on the Web.
    try {
      await window.MusicKit.configure({
        developerToken: data,
        app: {
          name: 'PlaylistGenerator',
          build: '1',
        },
      });
    } catch (err) {
      // Handle configuration error
    }
  
    // MusicKit instance is available
    const music = window.MusicKit.getInstance();
  });

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Received data</p>
    </div>
  );
}

export default AppleMusicConfig;