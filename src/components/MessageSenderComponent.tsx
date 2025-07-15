import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Send} from "lucide-react";
import {useAppContext} from "../context/AppContext.tsx";

const MessageSenderComponent = () => {
    const {message, setMessage, setChatMessage} = useAppContext()

    const handleMessageSend = () => {
        setChatMessage((prev) => [...prev, message]);
    }

    return (
        <div className={'flex flex-row align-items-center w-full gap-3'}>
            <InputText value={message} onChange={(e) => setMessage(e.target.value)} className={'w-full'}
                       placeholder={'Type your message ...'}/>
            <Button onClick={handleMessageSend} disabled={message === ''} size={'small'}>
                <Send/>
            </Button>
        </div>
    )
}
export default MessageSenderComponent