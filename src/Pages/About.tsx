import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppContext} from "../context/AppContext";



const About1= () => {
    const Navigate = useNavigate();
    const {selectedCity } = useAppContext()

    return(
        <div>
            <h2>About Page</h2>
            <p>Selected City: {selectedCity ? selectedCity.name : 'None'}</p>
            <Button onClick={()=>{Navigate('/')}} label={'To Home Page'}/>
        </div>
    )
}

export default About1