import React, {useEffect, useState, useContext, useRef } from "react";
import { ReactComponent as MusicIcon } from "../../assets/images/music.svg";
import SearchButton from "./SearchButton";
import { DropdownMenu } from "./Dropdown";
import { MusicKitContext } from "../../App";
import Auth from "./Auth";

// test 
import { fetchProfile } from "../../services/MusicApi";
import { genreSearchToCache, getFromCache } from "../../services/Cache";


function Nav({handleCallback, onLoadingChange}){   
    const music = useContext(MusicKitContext)
    const [selected, setSelected] = useState(null)
    const [searchResult, setSearchResult] = useState([])
    const [fetchedGenres, setFetchedGenres] = useState([])  
                                                        
    useEffect(() =>{
        handleCallback(searchResult)
    }, [searchResult])

    async function genreSearch(){
        const sessionDataJSON = sessionStorage.getItem('songCache')
        const sessionData = JSON.parse(sessionDataJSON)

        if(selected && !fetchedGenres.includes(selected.id)){
            onLoadingChange(true)
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
        const cacheCharts = genreSearchToCache(selected.val,charts) // place array of songs in session storage, return first 20 
        setSearchResult(cacheCharts);        
        onLoadingChange(false);
        setFetchedGenres([...fetchedGenres,selected.id])
        console.log(fetchedGenres)

        // test 
        // const profile = await fetchProfile();
        // console.log(profile)
        }
        else if(selected && fetchedGenres.includes(selected.id)){
            console.log(fetchedGenres)
            const target = selected.id
            const callCount = fetchedGenres.filter(item => item === target).length
            const cacheSongs = getFromCache(selected.val, callCount)
            setSearchResult(cacheSongs)
            setFetchedGenres([...fetchedGenres,selected.id])


            // just grab from session storage
        }
    }
    
    function GenreDropdownItem(props){

        function itemClick (){
            setSelected(props);
        }


        return(
            <div className = "menu-item" onClick = {itemClick}>
                <div className="dropdown-button">
                    {props.name} 
                </div>
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
                    <div className="icon-button" onClick={() => clickChange()} ref={dropdownRef} >
                        {selected === null ?  'Genres' : selected.name}
                    </div>
                    {open && props.children}
                    </li>
                
            );
        }
        
        return(                                     
            <nav className= "navbar">
                <ul className= "navbar-nav" data-testid = "drop">
                    <div>
                    <div className="title-box">
                        <h1>playlinq.io</h1>
                    </div>
                    <div className = "buttons-box">
                    <GenreNavItem icon= {<MusicIcon/>} value= "genre"> 
                        <DropdownMenu>
                            <GenreDropdownItem name = "Pop" id = "14" val = "pop"/>           
                            <GenreDropdownItem name = "Hip-Hop/Rap" id ="18" val = "hip-hop/rap"/>
                            <GenreDropdownItem name = "Rock" id = "21" val = "rock"/>
                            <GenreDropdownItem name = "R&B/Soul" id = "15" val = "r&b/soul"/>
                            <GenreDropdownItem name = "Alternative" id = "20" val = "alternative"/>
                            <GenreDropdownItem name = "Dance" id = "17" val = "dance"/>
                            <GenreDropdownItem name = "Country" id = "6" val = "country"/>
                            <GenreDropdownItem name = "Latin" id = "12" val = "latin"/>
                            <GenreDropdownItem name = "Raggae" id = "24" val = "raggae"/>      
                            <GenreDropdownItem name = "Classical" id = "5" val = "classical"/>
                        </DropdownMenu>   
                    </GenreNavItem>
                    <SearchButton onClick = {genreSearch} />
                    <Auth music = {music}/>
                    </div>
                    </div>
                </ul>
            </nav>  
        );
    
    }

  

export { Nav };