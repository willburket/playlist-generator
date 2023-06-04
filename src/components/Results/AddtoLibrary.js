import React, {useState} from "react";
import { ReactComponent as AddIcon} from "../../assets/images/add-button.svg";
import { ReactComponenet as CheckIcon} from "../../assets/images/check.svg";
import { useContext } from "react";
import { MusicKitContext, TokenContext } from "../../App";
import { addToLibrary } from "../../services/MusicApi";
import AddedPopUp from "./AddedPopUp";


function AddSong(props){
    const music = useContext(MusicKitContext);
    const token = useContext(TokenContext);
    const [added,setAdded] = useState(false);

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
            <a href = "#" className="add-button" onClick={onClick}>
              {/* {added ? <AddIcon/> : <CheckIcon/>} */}
                <AddIcon/>
                {/* <AddedPopUp added = {added}/> */}
            </a>

        </div>
    );

}

export default AddSong;
