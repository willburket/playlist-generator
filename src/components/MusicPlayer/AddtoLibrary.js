import React from "react";
import { ReactComponent as AddIcon} from "../../assets/images/add.svg";
import { useContext } from "react";
import { MusicKitContext } from "../../App";

function AddSong(props){
    const music = useContext(MusicKitContext);

    const onClick = async () => {
        // adds song if its not already added 

        const songId = props.song;
        const queryParameters = { ids: [songId]};
        console.log(songId);
        await music.api.music('/v1/me/library', queryParameters, { fetchOptions: { method: 'POST' } });

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