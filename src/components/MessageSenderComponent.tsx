import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Send} from "lucide-react";
import {useAppContext} from "../context/AppContext.tsx";
import {useState} from "react";

const MessageSenderComponent = () => {
    const {message, setMessage, setChatMessage} = useAppContext();
    const [isSending, setIsSending] = useState(false);

    const handleMessageSend = () => {
        if (message !== ''){
            setIsSending(true);
            
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                sender: 'user' as const,
                timestamp: new Date(),
                isNew: true
            };
            
            // Add some delay to show sending animation
            setTimeout(() => {
                setChatMessage((prev) => [...prev, newMessage]);
                setIsSending(false);
            }, 200);
        }
        setMessage('')
    }

    return (
        <div className={'flex flex-row align-items-center w-full gap-3 p-3 border-top-1'} 
             style={{backgroundColor: '#f8f9fa', borderColor: '#dee2e6'}}>
            <InputText value={message} onChange={(e) => setMessage(e.target.value)} className={'w-full'}
                       placeholder={'Type your message ...'} 
                       onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}/>
            <Button onClick={handleMessageSend} disabled={message === '' || isSending} size={'small'} 
                    className={`flex-shrink-0 ${isSending ? 'sending-animation' : ''}`}>
                <Send size={16}/>
            </Button>
        </div>
    )
}
export default MessageSenderComponent