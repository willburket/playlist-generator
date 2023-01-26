import React, {useState} from "react";

function useSearchData (){
    const [searchData, setSearchData] = useState()
    return [searchData, setSearchData]
}

export default useSearchData;