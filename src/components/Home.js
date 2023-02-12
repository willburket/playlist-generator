import React, { useContext, useEffect } from "react";
import { LoadContext, SearchContext } from "./Main";

function Home(){
    const load = useContext(LoadContext)
    const search = useContext(SearchContext)

    useEffect(()=>{
        // console.log(search)
    }, [search])

    useEffect(() => {
        // console.log(load)
    }, [load])

    if(!load && search.length === 0) return (<div className="prompt-text"><p>Pick a Genre</p></div>)

    if(load) return(<div className="prompt-text"><p>Loading...</p></div>) 
}

export default Home;