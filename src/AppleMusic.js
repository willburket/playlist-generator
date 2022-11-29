// import React from "react";
// import useExternalScripts from "./hooks/useExternalScripts";
// import * as fs from fs/promises
// import * as jwt from json

import React from "react";


// const fs = require("fs");       this is a node (server side) module, need to find a different one/ run this code on the server side 
// const jwt = require("jsonwebtoken");    need to use react-jwt

// const privateKeyPath = "./AuthKey_PA6274NFYR.p8";
// const privateKey = fs.readFileSync(privateKeyPath).toString();
// const teamId = "S3PHBMG8Q4";
// const keyId = "PA6274NFYR";
// const token = jwt.sign({}, privateKey, {
//   algorithm: "ES256",
//   expiresIn: "180d",
//   issuer: teamId,
//   header: {
//     alg: "ES256",
//     kid: keyId,
//   },
// });

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
        developerToken: 'MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgbN4lf9Mm/gKuczmgyOIwpiGZ6XHh2SC0eDSSGavHFhmgCgYIKoZIzj0DAQehRANCAASYrxk13YnEOWHzNPNrdxuLqFtHqyl5eE+HhVI19zUX8ogOLqgDQ2JT8Jjip0vXVxOfab681EvRHrh5JMCueOpN',
        app: {
            name: 'Playlist Generator',
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



export {MusicProvider}