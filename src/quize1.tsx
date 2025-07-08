import {useState} from "react";

const Quize1 = () => {
    const [number, setNumber] = useState(0);
    const onChangeNumber = (value) => {
        if (number<0){
            setNumber(0);
            return
        }
        setNumber(number+value)
    }
    console.log({number})

    return (
        <div>
            <button onClick={() => onChangeNumber(-1)}>-</button>
            <h2>{Math.max(0,number)}</h2>
            <button onClick={() => onChangeNumber(+1)}>+</button>
        </div>
    )
}
export default Quize1

