import React, {useEffect, useState, useRef, createContext, useContext} from "react";
import { ReactComponent as MusicIcon } from "../assets/images/music.svg"
import { App, MusicKitContext } from "../App";
import { AuthButton } from "./AuthButton";
import { MusicPlayer } from "./MusicPlayer";
import AlbumCovers from "./AlbumCovers";
import Home from "./Home";

const SearchContext = createContext(null);  
const LoadContext = createContext(null);

function Main(){
    const [selected, setSelected] = useState(null)
    const music = useContext(MusicKitContext);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

        
    useEffect(() => {
        // console.log(searchResult)
    }, [selected, searchResult])

    function Navbar(props){         // lets do some renaming on these components 
    
        function GenreDropdownItem(props){
    
            function itemClick (){
                setSelected(props)
            }
        
            return(
                <a href="#" className="menu-item" onClick = {() => itemClick()}>
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
                    setActive(null)
                    setOpen(!open)
                    
                }
                else{
                    
                    setActive(props.value)
                    setOpen(!open)
                }       
        
            };
        
            useEffect(()=> {
                const pageClickEvent = (e) =>{ 
                    if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)){
                        setOpen(false)
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
        
            async function searchMusic(){    
                setLoading(true)
                try{
                    // v3 search
                    // const queryParameters = { term: selected.value, types: ['songs'], l: 'en-us', limit: 25};
                    // const search = await music.api.music('/v1/catalog/{{storefrontId}}/search', queryParameters);
                    // setSearchResult([...search.data.results.songs.data])
                    
                    // v3 charts 
                    const queryParameters = {types: ['songs'], l: 'en-us', limit: 100};
                    const search = await music.api.music(`/v1/catalog/{{storefrontId}}/charts`, queryParameters);   // works 
                    setSearchResult([...search.data.results.songs[0].data])  // works for charts 

                    // test 
                    // const queryParameters = {types: ['songs'], l: 'en-us', genre: 'R&B/Soul',limit: 100};
                    // const search = await music.api.music(`/v1/catalog/{{storefrontId}}/charts`, queryParameters);   // works 
                    // setSearchResult([...search.data.results.songs[0].data])  // works for charts 
                    
                }
                catch(err){
                    console.log(err)        // add popup for when nothing is selected 
                }
                finally{
                    setLoading(false)
                }
            }
            
            
            return(
                <li className = "nav-item">
                    <a href="#" className="icon-button" onClick = {searchMusic}>
                        Search
                    </a>
                </li>
            );
        }   
        
        // we can make this better 
        return(        
            <nav className= "navbar">
                <ul className= "navbar-nav">
                    <GenreNavItem icon= {<MusicIcon/>} value= "genre">
                        <DropdownMenu>
                            <GenreDropdownItem name = "Pop" value = "pop"/>
                            <GenreDropdownItem name = "Rap" value = "rap"/>
                            <GenreDropdownItem name = "Rock" value = "rock"/>
                            <GenreDropdownItem name = "R&B" value = "r&b"/>
                            <GenreDropdownItem name = "Country" value = "country"/>
                            <GenreDropdownItem name = "Dance" value = "dance"/>
                            <GenreDropdownItem name = "Dubstep" value = "dubstep"/>
                            <GenreDropdownItem name = "Latin" value = "latin"/>
                            <GenreDropdownItem name = "Alternative" value = "alternative"/>
                            <GenreDropdownItem name = "Indie" value = "indie"/>
                            <GenreDropdownItem name = "Raggae" value = "raggae"/>      
                        </DropdownMenu>   
                    </GenreNavItem>
                    <SearchButton/>
                    <AuthButton/>
                    
                </ul>
            </nav>  
        );
    
    }

    return(
        <div>
            <Navbar/>
            <SearchContext.Provider value = {searchResult}>
            <MusicPlayer/>
                    <LoadContext.Provider value = {loading}>
                        <Home/>
                        <AlbumCovers/> 
                    </LoadContext.Provider>
            </SearchContext.Provider>
        </div>
    );

}

export { Main, SearchContext, LoadContext};
