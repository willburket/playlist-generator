import React, { useContext } from "react";
import { LoadContext, SearchContext } from "../Navbar/Navbar";
import {ReactComponent as MusicIcon} from "../../assets/images/music.svg"
import {ReactComponent as LoadIcon} from "../../assets/images/loading.svg"

function Home(){
    const load = useContext(LoadContext);
    const search = useContext(SearchContext);

    if(!load && search.length === 0){
        return (
        <div className="center-container">
            <div className="prompt">            
                <p>Pick a Genre</p>
                <MusicIcon/>    
            </div>
        </div>
        )
    } 
    else if (load){
        return(
            <div className="center-container">
                <div className="spinner">
                    <LoadIcon/>
                </div>
            </div>
        )
    }
}

export default Home;