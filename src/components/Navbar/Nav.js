import React, {useEffect, useState, useRef, createContext } from "react";
import { ReactComponent as MusicIcon } from "../../assets/images/music.svg"
// import { ReactComponent as RecordIcon } from "../assets/images/record.svg"
import AuthButton from "./AuthButton";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import PopUp from "../Error/PopUp";
import AlbumCovers from "../Results/AlbumCovers";
import Home from "../Home/Home";

const SearchContext = createContext(null);  
const LoadContext = createContext(null);

function Main(){
    const [selected, setSelected] = useState(null)
    // const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    function Navbar(props){         // lets do some renaming on these components 
    
        function GenreDropdownItem(props){
    
            function itemClick (){
                setSelected(props);
            }
        
            return(
                <a href="#" className = "menu-item" onClick = {itemClick}>
                    <div className="dropdown-button">
                        {props.name} 
                    </div>
                </a>
            );
        }
        
        function DropdownMenu(props){
        
            return (
                <div className="dropdown">
                    {props.children}
                </div>
            );
        }
        
        function GenreNavItem (props) {
        
            const [open, setOpen] = useState(false);
            const [active, setActive] = useState(null);
            const dropdownRef = useRef(null);
        
            function clickChange(){
                
                if (open && active != null){
                    setActive(null);
                    setOpen(!open);
                    
                }
                else{
                    setActive(props.value);
                    setOpen(!open);
                }       
        
            };
        
            useEffect(()=> {
                const pageClickEvent = (e) =>{ 
                    if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
                        setOpen(false);
                    }
                };
        
                if(active){
                    window.addEventListener('click', pageClickEvent);
                }
                
                return () =>{
                    window.removeEventListener('click', pageClickEvent);
                }
        
            }, [active]);
        
            return (              
                    <li className = "nav-item">
                    <a href="#" className="icon-button" onClick={() => clickChange()} ref={dropdownRef}>
                        {selected === null ? props.icon : selected.name}
                    </a>
                    {open && props.children}
                    </li>
                
            );
        
        }

        function SearchButton (){

            function shuffle(search){
                let currentIndex = search.length,  randomIndex;

                // While there remain elements to shuffle.
                while (currentIndex !== 0) {

                    // Pick a remaining element.
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;

                    // And swap it with the current element.
                    [search[currentIndex], search[randomIndex]] = [
                    search[randomIndex], search[currentIndex]];
                }
                return search;
            }
  
            async function genreSearch(){

                if(selected){
                    const response = await fetch('https://localhost:8080/music', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                },
                body: selected.id
                  })
                const data = await response.json();
                const charts = [...data.songs[0].data];
                shuffle(charts);
                setSearchResult(charts);
                }

                
            }
            
            return(
                <li className = "nav-item">
                    <a href="#" className="icon-button" onClick = {genreSearch}>
                        Search
                    </a>
                </li>
            );
        }   
        
        // we can make this better 
        return(        
            <nav className= "navbar" >
                <ul className= "navbar-nav" data-testid = "drop">
                    {/* <RecordIcon/> */}
                    <GenreNavItem icon= {<MusicIcon/>} value= "genre">
                        <DropdownMenu>
                            <GenreDropdownItem name = "Pop" value = "pop" id = "14"/>
                            <GenreDropdownItem name = "Hip-Hop/Rap" value = "rap" id ="18"/>
                            <GenreDropdownItem name = "Rock" value = "rock" id = "21"/>
                            <GenreDropdownItem name = "R&B/Soul" value = "r&b" id = "15"/>
                            <GenreDropdownItem name = "Alternative" value = "alt" id = "20"/>
                            <GenreDropdownItem name = "Dance" value = "dance" id = "17"/>
                            <GenreDropdownItem name = "Country" value = "country" id = "6"/>
                            <GenreDropdownItem name = "Latin" value = "latin" id = "12"/>
                            <GenreDropdownItem name = "Raggae" value = "raggae" id = "24"/>      
                            <GenreDropdownItem name = "Classical" value = "classical" id = "5"/>
                        </DropdownMenu>   
                    </GenreNavItem>
                    <SearchButton/>
                    <AuthButton/>                   
                </ul>
            </nav>  
        );
    
    }

    return(
        <div data-testid = "navbar">
            <Navbar/>
            <SearchContext.Provider value = {searchResult}>
            <MusicPlayer/>
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