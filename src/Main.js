import React from "react";
import useSearchData from "./hooks/useSearchData";

function Main (){
    const [searchData] = useSearchData()    // this is not going to work

    return(
        <div>
            <p>
                {searchData}
            </p>
        </div>
    )
}

export default Main;

// app
    // main 
        // navbar
            // search
