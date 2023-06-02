import React from "react";
import { ReactComponent as AddButton} from "../../assets/images/add.svg"

function AddSong(){

    const onClick = () => {
        // adds song if its not already added 
        console.log("added")

    }

    // we want it to turn to a check mark svg if the song is already added 
    return(
        <div>
            <a href = "#" className="add-button" onClick={onClick}>
                <AddButton/>
            </a>

        </div>
    );

}

export default AddSong;