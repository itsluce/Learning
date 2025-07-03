import {useState} from "react";

const Message = ({showMessage}:{showMessage:boolean}) => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [value, setValue] = useState({
        message: '',
        name: ''
    });
    const onSubmit = (e: any) => {
        e.preventDefault();
        if (message !== '' && name !== '') {
            setValue({message, name})
            setMessage('')
            setName('')
        }
    }
    console.log({showMessage})
    return (
        <div>
            {showMessage &&
                <form onSubmit={onSubmit}>
                    <input onChange={(value) => setMessage(value.target.value)} value={message}
                           placeholder={'this is message'}/>
                    <input onChange={(value) => setName(value.target.value)} value={name} placeholder={'this is name'}/>
                    <button type={"submit"}>submit</button>
                    <h2>{value.message}</h2>
                    <h2>{value.name}</h2>
                </form>
            }
        </div>
    )
}
export default Message