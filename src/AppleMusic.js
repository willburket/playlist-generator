// import React from "react";
// import useExternalScripts from "./hooks/useExternalScripts";
// import * as fs from fs/promises
// import * as jwt from json

import React from "react";



// console.log(token);

// const setupMusicKit = new Promise((resolve) => {
//   document.addEventListener("musickitloaded", () => {
//     const musicKitInstance = window.MusicKit.configure({
//       developerToken: "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgbN4lf9Mm/gKuczmgyOIwpiGZ6XHh2SC0eDSSGavHFhmgCgYIKoZIzj0DAQehRANCAASYrxk13YnEOWHzNPNrdxuLqFtHqyl5eE+HhVI19zUX8ogOLqgDQ2JT8Jjip0vXVxOfab681EvRHrh5JMCueOpN",    // use our own token code or something?
//       app: {
//         name: "MusicKit Web App",
//         build: "1.0.0",
//       },
//     });
//     delete window.MusicKit; // clear global scope
//     resolve(musicKitInstance);
//   });
// });


class MusicProvider{

  static sharedProvider() {
      if(!MusicProvider.instance) {
          MusicProvider.instance = new MusicProvider();
      }
      return MusicProvider.instance;
  }

  configure() {
    document.addEventListener("musickitloaded", () => {
      window.MusicKit.configure({
        developerToken: 'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgIr73FJAvLQtymY+oOKz8W668qypyZpMH/fBllR7bxqWgCgYIKoZIzj0DAQehRANCAASYGFz5GcWotIr+ytQb1fWWglQ/3f/JILmxN33qNif3qYV831rP5iFLz2/p4A+AxdOdCvOLtTMwkUoAZ9PTupKW',
        app: {
            name: 'PlaylistGenerator',
            build: '1.0.0'
        }
    });
    })

    // try{
      
      
    // }catch(error){
    //   console.log("configure failed " + error.message) 
    // }
      
  }

  getMusicInstance() {
      return window.MusicKit.getInstance();
  }
}

function AuthorizeButton(props){
  // let music = MusicKit.getInstance()
  // let song = music.api.song('1207120538').then(callback);
  //console.log(song)

  return (
    <div>
      <button data-apple-music-play>
        Play
      </button>

    </div>
  );
}


export {MusicProvider, AuthorizeButton, }