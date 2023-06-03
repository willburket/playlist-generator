import React from "react";
import { ReactComponent as AddIcon} from "../../assets/images/add.svg";
import { useContext } from "react";
import { MusicKitContext, TokenContext } from "../../App";


function AddSong(props){
    const music = useContext(MusicKitContext);
    const token = useContext(TokenContext);

    const onClick = async () => {
        // adds song if its not already added 

        const songId = props.song;
        const queryParameters = { ids: [songId]};
        console.log(songId);
        fetch(`https://api.music.apple.com/v1/me/library?ids[songs]=[${songId}]`, {    //https://api.music.apple.com/v1/me/library/songs/${songId}
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then((response) => {
            if (response.ok) {
              console.log('Song added to library!');
            } else {
              console.error('Error adding song to library:', response.status);
            }
          })
          .catch((error) => {
            console.error('Error adding song to library:', error);
          });
        // await music.api.music('/v1/me/library', queryParameters, { fetchOptions: { method: 'POST' } });

    }

    // we want it to turn to a check mark svg if the song is already added 
    return(
        <div className="add-container">
            <a href = "#" className="add-button" onClick={onClick}>
                <AddIcon/>
            </a>

        </div>
    );

}

export default AddSong;