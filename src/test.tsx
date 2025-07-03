import {Button} from "primereact/button";
import Message from "./message";
import Users from "./users";
import React, {useState} from "react";

const Test = () => {

    const [value, setValue] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    // useEffect(() => {
    //     setValue(20)
    // }, [])

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem'}}>
                <Button size={'small'} icon="pi pi-minus" rounded severity="danger" aria-label="Cancel"
                        onClick={() => {
                            setValue(value - 2)
                        }}/>
                <h2>{value}</h2>
                <Button size={'small'} icon="pi pi-plus" rounded severity="success" aria-label="Cancel"
                        onClick={() => {
                            setValue(value + 2)
                        }}/>
            </div>
            <Message showMessage={showMessage}/>
            <Users/>
            <Button onClick={() => {
                setShowMessage(!showMessage)
            }}>
                show message
            </Button>
        </div>
    )
}
export default Test