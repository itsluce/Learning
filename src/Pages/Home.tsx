import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Dropdown} from 'primereact/dropdown';
import {useAppContext} from "../context/AppContext";


const Home1 = () => {
    const Navigate = useNavigate();
    const {selectedCity, setSelectedCity} = useAppContext()
    const cities = [
        {name: 'Damascus'},
        {name: 'Istanbul'},
        {name: 'Riyadh'},
        {name: 'Dubai'},
        {name: 'Paris'}
    ];

    return (
        <div>
            <h2>Home Page</h2>
            <Button onClick={() => {
                Navigate('/about')
            }} label={'To About Page'}/>

            <div>
                <Dropdown value={selectedCity} onChange={(e) => {
                    setSelectedCity(e.value)
                    if (selectedCity !== null){
                        Navigate('/about')
                    }
                }} options={cities}
                          optionLabel="name" showClear placeholder="Select a City"/>
            </div>
        </div>
    )
}

export default Home1