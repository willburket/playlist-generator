import React, {useEffect, useState, useContext, createContext, useRef } from "react";
import PopUp from "../Error/Unauthorized";
import AlbumCovers from "../Results/Grid";
import Home from "../Home/Home";
import { MusicKitContext } from "../../App";
import Player from "../MusicPlayer/Player";
import { Nav } from "./Nav";


const SearchContext = createContext(null);  
const LoadContext = createContext(null);

function Main(){
    
    const music = useContext(MusicKitContext);
    
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        console.log("main results:")
        console.log(searchResult)
    }, [searchResult])
   
    const navCallback = (data) =>{
        setSearchResult(data)
    }

    return(
        <div data-testid = "navbar">
            <Nav handleCallback = {navCallback}/>
            <SearchContext.Provider value = {searchResult}>
            <Player/>
                    <LoadContext.Provider value = {loading}>
                        {/* <Home/>  */}
                        <PopUp/>
                        <AlbumCovers/> 
                    </LoadContext.Provider>
            </SearchContext.Provider>
        </div>
    );

}

export { Main, SearchContext, LoadContext};