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
        <div className={'flex flex-row align-items-center w-full gap-2 sm:gap-3 p-2 sm:p-3 border-top-1'} 
             style={{backgroundColor: '#f8f9fa', borderColor: '#dee2e6'}}>
            <InputText value={message} onChange={(e) => setMessage(e.target.value)} className={'w-full text-sm sm:text-base'}
                       placeholder={'Type your message ...'} 
                       onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}/>
            <Button onClick={handleMessageSend} disabled={message === '' || isSending} size={'small'} 
                    className={`flex-shrink-0 w-2rem h-2rem sm:w-auto sm:h-auto ${isSending ? 'sending-animation' : ''}`}>
                <Send size={14} className="sm:w-1rem sm:h-1rem"/>
            </Button>
        </div>
    )
}
export default MessageSenderComponent