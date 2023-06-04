import axios from 'axios';

export async function addToLibrary(song, token, mediaType) {
    try {
      await axios({
        method: 'post',
        // url: `${API_URL}/v1/me/library?ids[${mediaType}]=${song}`,
        url: `https://api.music.apple.com/v1/me/library?ids[${mediaType}]=${song}`,
        headers: getHeaders(token),
      });
      console.log("Added tracks to your library, they'll show up in a few seconds. Hold tight!");
    } catch (error) {
      console.log("We're unable to add these tracks to your library.");
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