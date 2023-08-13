import React, { useEffect, useState, createContext } from "react";
import PopUp from "../Error/Unauthorized";
import AlbumCovers from "../Results/Grid";
import Home from "../Home/Home";
import Player from "../MusicPlayer/Player";
import { Nav } from "./Nav";

const SearchContext = createContext(null);  
const LoadContext = createContext(null);

function Main(){
    
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
   
    const navCallback = (data) =>{
        console.log("callback called")
        if(data){
            console.log(data)
            setSearchResult(data)
        }
    }
    const loadCallback = (load) =>{
        setLoading(load)
    }

    return(
        <div data-testid = "navbar">
            <Nav handleCallback = {navCallback} onLoadingChange = {loadCallback}/>
            <SearchContext.Provider value = {searchResult}>
            <Player/>
                    <LoadContext.Provider value = {loading}>
                        <Home/> 
                        <PopUp/>
                        <AlbumCovers/> 
                    </LoadContext.Provider>
            </SearchContext.Provider>
        </div>
    );

}

export { Main, SearchContext, LoadContext};