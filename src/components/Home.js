import React, { useContext, useEffect } from "react";
import { LoadContext, SearchContext } from "./Main";

function Home(){
    const load = useContext(LoadContext)
    const search = useContext(SearchContext)

    useEffect(()=>{
        console.log(search)
    }, [search])

    useEffect(() => {
        console.log(load)
    }, [load])

    if(!load && search === []) return <p>Pick a Genre</p>

    if(load) return <p>Loading...</p>
}

export default Home;