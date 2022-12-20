
import React from "react";


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
            name: 'playlist-generator',
            build: '0.1.0'
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
  // console.log(song)

  return (
    <div>
      <button data-apple-music-play>
        Play
      </button>

    </div>
  );
}


export {MusicProvider, AuthorizeButton, }