import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useAppContext} from "../context/AppContext";



const About1= () => {
    const Navigate = useNavigate();
    const {selectedCity , setSelectedCity } = useAppContext()

    console.log({selectedCity})
    return(
        <div>
            <h2>About Page</h2>
            <p>Selected City: {selectedCity ? selectedCity : 'None'}</p>
            <Button onClick={()=>{
                setSelectedCity('')
                Navigate('/')}} label={'To Home Page'}/>
        </div>
    )
}

export default About1