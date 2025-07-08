import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {isBooleanObject} from "node:util/types";

const Hw1 = () => {
    const [messageApp ,setMessageApp] = useState(false);
const sariya =()=>{
    setMessageApp(prev=>!prev)
}
    return(
        <div>{messageApp && (
            <div>
                <InputText placeholder={'this is message'}/>
            </div>            )}


            <Button label="Submit"
                onClick={sariya}{messageApp ? 'hide Input' : 'show Input'}/>

        </div>
    )
}
export default Hw1;