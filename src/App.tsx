import React, {useEffect, useState} from "react";
import Message from "./message";
import Users from "./users";

const users = [
    {id: 1, name: 'Alice', age: 28, email: 'alice@example.com'},
    {id: 2, name: 'Bob', age: 34, email: 'bob@example.com'},
    {id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com'}
]

const App = () => {

    const [value, setValue] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    // useEffect(() => {
    //     setValue(20)
    // }, [])

    return (
        <div>
            <h1>3mk</h1>

            <p> abd al hamid </p>

            <button onClick={() => {
                setValue(value - 2)
            }}>-
            </button>
            <h2>
                {value}
            </h2>
            <button onClick={() => {
                setValue(value + 2)
            }}>+
            </button>
            <Message showMessage={showMessage}/>
            <button onClick={() => {
                setShowMessage(!showMessage)
            }}>
                show message
            </button>
            <Users/>
        </div>
    )
}
export default App