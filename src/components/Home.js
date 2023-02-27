import React, { useContext, useEffect } from "react";
import { LoadContext, SearchContext } from "./Navbar";
import {ReactComponent as MusicIcon} from "../assets/images/music.svg"

function Home(){
    const load = useContext(LoadContext);
    const search = useContext(SearchContext);

    if(!load && search.length === 0){
        return (
        <div className="prompt">            
                <p>Pick a Genre</p>
                <MusicIcon/>    
        </div>
        )
    } 

    
}

export default Home;