import React, {useEffect, useState} from "react";

function useSelectedGenre(){
    const [selected_genre, setSelectedGenre] = useState(null);

    function handleStatusChange(status) {
        setActiveMenu(status.value);
      }
    
    useEffect(() => {
        
    })

    return(selected_genre)  
};