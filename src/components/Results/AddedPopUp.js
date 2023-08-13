import React, { useEffect, useState } from "react";

function AddedPopUp(props){
    const [show,setShow] = useState(false);
    

    useEffect(() =>{
        if(props.added === true){
            setShow(true)
        }
    }, [props.added])

    return(
        <div>
            {show &&
            <div className="alert-container">
                <div className="popup">Song Added to Library</div>
            </div>}
        </div>
    )
}

export default AddedPopUp;