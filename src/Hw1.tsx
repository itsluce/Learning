import {useState} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

const HW = () => {
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [submitMessage, setSubmitMessage] = useState([]);
    const onSubmit = (e: any) => {
        e.preventDefault();
        if (message.trim() !== '') {
            setSubmitMessage((prev) => [...prev, message.trim()]);
            setMessage('');
        }
    };
    const handleShowMessage = () => {
        setIsShowMessage(prev => !prev);
    }
    // const filterSubmitMessage =
    console.log({submitMessage})
    return (<div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap'
    }}>
        <Button onClick={handleShowMessage}>{isShowMessage ? 'Hide Input' : 'Show Input'}</Button>

        {isShowMessage && (
            <form onSubmit={onSubmit} style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
            }}>
                <InputText invalid onChange={(value) => setMessage(value.target.value)} value={message}
                           placeholder="This is a message"/>
                <Button type="submit"
                        icon="pi pi-check"
                        label="Submit"
                        iconPos="right"
                        severity="success"/>
                {submitMessage.map((item) => {
                        return (
                            <div>
                                <h2>{item}</h2>
                                <Button icon="pi pi-trash" severity={'danger'} onClick={(i)=>setSubmitMessage(submitMessage.filter((item)=>item===i))}  />
                            </div>
                        )
                    }
                )}
                <Button icon="pi pi-trash" label={'Clear'} severity={'danger'} onClick={()=>setSubmitMessage([])}  />
            </form>)}
    </div>);
};
export default HW;
