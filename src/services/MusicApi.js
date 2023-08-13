import axios from 'axios';

export async function addToLibrary(song, token, mediaType) {
    
    try {
      await axios({
        method: 'post',
        // url: `${API_URL}/v1/me/library?ids[${mediaType}]=${song}`,
        url: `https://api.music.apple.com/v1/me/library?ids[${mediaType}]=${song}`,
        headers: getHeaders(token),
      });
      // console.log("Added tracks to your library, they'll show up in a few seconds. Hold tight!");
      // alert("Added tracks to your library, they'll show up in a few seconds. Hold tight!");
    } catch (error) {
      // console.log("We're unable to add these tracks to your library.");
      alert("We're unable to add these tracks to your library.");
    }
  }

export function getHeaders(token) {
    const music = window.MusicKit.getInstance();
  
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': music.musicUserToken,
    };
  }

export async function playItem(index, playlist){
  const queue = playlist.slice(index,20);
  const id_array = queue.map(function(song){
    return song.id;
  });
  const music = window.MusicKit.getInstance();
  await music.setQueue({songs: id_array, startPlaying: true});   
}

export function getPlayingItem() {
  return window.MusicKit.getInstance().player.nowPlayingItem;
}

export function isCurrentTrack(song) {
  const playing = getPlayingItem();

  if (!playing) {
    return false;
  }

  return (song.id === playing.id);
}

export function isTrackPlaying(song) {
  return window.MusicKit.getInstance().player.isPlaying && isCurrentTrack(song);
}

export async function fetchProfile(){
  const userToken = window.MusicKit.getInstance().musicUserToken;
  const response = await fetch('http://localhost:3000/dev/profile', {  
        method: 'GET',                                              
        headers: {
            'Authorization' : `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
        });

    const data = await response.json();
    return data;
}