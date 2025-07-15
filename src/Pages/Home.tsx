import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Dropdown} from 'primereact/dropdown';
import {useAppContext} from "../context/AppContext";
import {MultiSelect} from "primereact/multiselect";

const cities = [
    {name: 'Damascus', value: 'SYR'},
    {name: 'Istanbul', value: 'TU'},
    {name: 'Riyadh', value: 'KSA'},
    {name: 'Dubai', value: 'UAE'},
    {name: 'Paris', value: 'Paris'}
];

const fruits = [
    {name: 'banana', value: 'banana'},
    {name: 'apple', value: 'apple'},
    {name: 'blue barry', value: 'blue barry'},
    {name: 'orange', value: 'orange'},
    {name: 'watermelon', value: 'watermelon'}
];

const Home1 = () => {
    const navigate = useNavigate();
    const {selectedCity, setSelectedCity, selectedFruit, setSelectedFruit} = useAppContext()

    useEffect(() => {
        if (selectedCity !== undefined && selectedCity !== '') {
            navigate('/about')
        }
    }, [selectedCity]);

    return (
        <div>
            <h2>Home Page</h2>
            <Button onClick={() => {
                navigate('/about')
            }} label={'To About Page'}/>

            <div>
                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)}
                options={cities} optionLabel="name" optionValue="value" showClear placeholder="Select a City"/>

                <MultiSelect value={selectedFruit} onChange={(e) => setSelectedFruit(e.value)} options={fruits} optionLabel="name"
                             placeholder="Select Fruits" maxSelectedLabels={3} className="w-full md:w-20rem" display="chip"  />
            </div>
        </div>
    )
}

export default Home1