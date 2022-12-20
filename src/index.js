import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MusicProvider } from './AppleMusic';

// let musicProvider = MusicProvider.sharedProvider(); //this is returning null
// musicProvider.configure();  //this isn't working
// let musicInstance = musicProvider.getMusicInstance(); // add to app component musicInstance = {musicInstance}

// document.addEventListener('musickitloaded', async function(){
//   try {
//     fetch("/jwt").then(response => response.json).then(res => {
//       const music =  window.MusicKit.configure({
//         developerToken: res.token,
//           app: {
//               name: 'PlaylistGenerator',
//               build: '1.0.0'
//           }
//       });
//     })
    
//   } catch(err){
//     console.log(err)
//   }

  
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();