import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

const Home = ()=>{

    const Navigate = useNavigate();
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return(
        <div>
            <h2>Home Page</h2>
            <Button onClick={()=>{Navigate('/about')}} label={'To About Page'}/>
            <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                           showClear placeholder="Select a City" className="w-full md:w-14rem" /> </div>

        </div>


    )
}
export default Home