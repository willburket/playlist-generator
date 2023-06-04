import React from "react";
import { ReactComponent as AddIcon} from "../../assets/images/add-icon.svg";
import { useContext } from "react";
import { MusicKitContext, TokenContext } from "../../App";
import { addToLibrary } from "../../services/MusicApi";


function AddSong(props){
    const music = useContext(MusicKitContext);
    const token = useContext(TokenContext);

    const onClick = async () => {
      const songId = props.song;
      const mediaType = 'songs';
        // check if song is added?
        
      if (!music.isAuthorized){
        console.log("please sign in");
        return
      }
      else{
        try{
          addToLibrary(songId, token, mediaType)
        }
        catch(error){
          console.log(error);
        }
      }
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
