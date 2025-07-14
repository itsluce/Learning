import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {Dropdown} from 'primereact/dropdown';
import {useAppContext} from "../context/AppContext";


const Home1 = () => {
    const Navigate = useNavigate();
    const {selectedCity, setSelectedCity} = useAppContext()

    useEffect(() => {
        if (selectedCity !== undefined && selectedCity !== '') {
            Navigate('/about')
        }
    }, [selectedCity]);

    const cities = [
        {name: 'Damascus',value:'SYR'},
        {name: 'Istanbul',value:'TU'},
        {name: 'Riyadh',value:'KSA'},
        {name: 'Dubai',value:'UAE'},
        {name: 'Paris',value:'Paris'}
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

                }}

                          options={cities} optionLabel="name" optionValue="value"  showClear placeholder="Select a City"/>
            </div>
        </div>
    )
}

export default Home1