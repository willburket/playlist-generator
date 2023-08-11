import React, {useEffect, useState, useContext, useRef } from "react";
import { ReactComponent as MusicIcon } from "../../assets/images/music.svg";
import SearchButton from "./SearchButton";
import { DropdownMenu } from "./Dropdown";
import { MusicKitContext } from "../../App";
import Auth from "./Auth";
import { shuffle } from "../../services/Playlist";


function Nav({handleCallback, onLoadingChange}){   
    const music = useContext(MusicKitContext)
    const [selected, setSelected] = useState(null)
    const [searchResult, setSearchResult] = useState([])

    useEffect(() =>{
        handleCallback(searchResult)
    }, [searchResult])

    async function genreSearch(){

        if(selected){
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
        shuffle(charts);
        setSearchResult(charts);  
        onLoadingChange(false)
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
                    <SearchButton onClick = {genreSearch} />
                    <Auth music = {music}/>
                    </div>
                    </div>
                </ul>
            </nav>  
        );
    
    }

  

export { Nav };