import React, { useContext } from "react";
import { SearchContext } from "./Main";

function SearchItems(){
    const search = useContext(SearchContext)


    return(
        <div>
            {search ? (
            <ul>
            {search.map(item => (
            <li key={item.id}>{item.attributes.artistName}: {item.attributes.name}</li>
            ))}
            </ul>
            ) : (
            <p>No items found</p>
            )}
        </div>   
    )
}

export default SearchItems;