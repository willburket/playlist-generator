import React, {useState} from "react";
import { ReactComponent as AddIcon} from "../../assets/images/add-button.svg";
import { ReactComponent as CheckIcon} from "../../assets/images/check-symbol.svg";     
import { useContext } from "react";
import { MusicKitContext, TokenContext } from "../../App";
import { addToLibrary } from "../../services/MusicApi";

function AddSong(props){
    const music = useContext(MusicKitContext);
    const token = useContext(TokenContext);
    const [added,setAdded] = useState(false);

    const onClick = async () => {
      const songId = props.song;
      const mediaType = 'songs';
      
        
      if (!music.isAuthorized){
        // console.log("please sign in");
        alert("Please sign into your Apple Music Account");
        return
      }
      else{
        try{
          addToLibrary(songId, token, mediaType);
          setAdded(true);
        }
        catch(error){
          console.log(error);
        }
      }
    }

    // we want it to turn to a check mark svg if the song is already added 
    return(
        <div className="add-container">
            <div className="grid-button" onClick={onClick}>
              {added ? <CheckIcon/> : <AddIcon/>}
            </div>
        </div>
    );

}

export default AddSong;
