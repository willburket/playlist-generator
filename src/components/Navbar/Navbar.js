import React, {useEffect, useState, useContext, createContext, useRef } from "react";
import { ReactComponent as MusicIcon } from "../../assets/images/music.svg";
import AuthButton from "./AuthButton";
import PopUp from "../Error/Unauthorized";
import AlbumCovers from "../Results/Grid";
import SearchButton from "./SearchButton";
import Home from "../Home/Home";
import { DropdownMenu } from "./Dropdown";
import { MusicKitContext, TokenContext } from "../../App";
import Player from "../MusicPlayer/Player";
import { fetchLibrary, fetchRecent } from "../../services/MusicApi";



const SearchContext = createContext(null);  
const LoadContext = createContext(null);

function Main(){
    
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false); 
    const token = useContext(TokenContext);


    function Navbar(props){   

        useEffect(() => {
            if (music){
                setIsAuthorized(music.isAuthorized)
                
            }
        }, [music, loading]);
            
        
        async function genreSearch(){

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
            if(selected){
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 2000))
                const response = await fetch('http://localhost:3000/dev/genre', {  //http://localhost:3000/dev/genre for dev
                method: 'POST',                                              
                headers: {
                    'Content-Type': 'text/plain'
            },
            body: selected.id
              })
            
            const data = await response.json();
            const charts = [...data.message.songs[0].data];
            shuffle(charts);
            setSearchResult(charts);  
            setLoading(false);
            }

            const recent = await fetchRecent();
            console.log(recent.message.data)

        }

        async function authStatusChange(){
            try{
                if (isAuthorized === false){               
                    await music.authorize();

                }
                else{
                    await music.unauthorize();
                }
                setIsAuthorized(!isAuthorized);
                
            }
            catch(err){
                console.log(err);
            }
        }

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
                    <a href="#" className="icon-button" onClick={() => clickChange()} ref={dropdownRef} data-testid = "genre">
                        {selected === null ? props.icon : selected.name}
                    </a>
                    {open && props.children}
                    </li>
                
            );
        }
        
        return(                                     
            <nav className= "navbar" >
                <ul className= "navbar-nav" data-testid = "drop">
                    <GenreNavItem icon= {<MusicIcon/>} value= "genre">
                        <DropdownMenu>
                            <GenreDropdownItem name = "Pop" id = "14"/>           
                            <GenreDropdownItem name = "Hip-Hop/Rap" id ="18"/>
                            <GenreDropdownItem name = "Rock" id = "21" />
                            <GenreDropdownItem name = "R&B/Soul" id = "15" />
                            <GenreDropdownItem name = "Alternative" id = "20" />
                            <GenreDropdownItem name = "Dance" id = "17" />
                            <GenreDropdownItem name = "Country" id = "6" />
                            <GenreDropdownItem name = "Latin" id = "12" />
                            <GenreDropdownItem name = "Raggae" id = "24" />      
                            <GenreDropdownItem name = "Classical" id = "5" />
                        </DropdownMenu>   
                    </GenreNavItem>
                    <SearchButton onClick = {genreSearch}/>
                    {/* <Auth music = {music}/> */}
                    <AuthButton music = {music} onClick = {authStatusChange} auth = {isAuthorized}/>
                </ul>
            </nav>  
        );
    
    }

    return(
        <div data-testid = "navbar">
            <Navbar/>
            <SearchContext.Provider value = {searchResult}>
            {/* <MusicPlayer/> */}
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