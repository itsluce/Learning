import React from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h2>Page Not Found (404)</h2>
            <Button label={'Back to Home Page'} onClick={()=>navigate('/')}/>
        </div>
    )
}

export default NotFound