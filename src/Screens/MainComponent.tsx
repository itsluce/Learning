import {useAppContext} from "../context/AppContext.tsx";
import {useEffect, useState} from "react";

const MainComponent = () => {
    const {chatMessage, knowledgeValue} = useAppContext();
    const [animatingMessages, setAnimatingMessages] = useState<Set<string>>(new Set());
    const [responseMessages, setResponseMessages] = useState<string>('');
    useEffect(() => {
        const newMessages = chatMessage.filter(msg => msg.isNew);
        if (newMessages.length > 0) {
            const newIds = new Set(newMessages.map(msg => msg.id));
            setAnimatingMessages(newIds);

            // Remove animation after animation completes
            setTimeout(() => {
                setAnimatingMessages(new Set());
            }, 300);
        }
    }, [chatMessage]);
    useEffect(() => {
        if (chatMessage.some((item) => item.text === knowledgeValue[0]?.text)) {
            setResponseMessages(knowledgeValue[0].textArea);
        }
    }, [chatMessage]);


    return (
        <div className={'w-full p-2 sm:p-3 flex-1 overflow-y-auto'}
             style={{backgroundColor: '#ffffff', maxHeight: 'calc(95vh - 200px)', overflowY: 'auto'}}>

            {chatMessage.map((msg) => {
                const isUser = msg.sender === 'user';
                const isAnimating = animatingMessages.has(msg.id);
                const animationClass = isAnimating ? (isUser ? 'message-enter-user' : 'message-enter-bot') : '';

                return (
                    <div key={msg.id}
                         className={`flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'} ${animationClass}`}>
                        <div
                            className={`w-full sm:max-w-20rem md:max-w-25rem lg:max-w-30rem p-2 sm:p-3 border-round-2xl shadow-1 ${
                                isUser
                                    ? 'border-round-bottom-right-none'
                                    : 'border-round-bottom-left-none'
                            }`} style={{
                            backgroundColor: isUser ? '#007bff' : '#f8f9fa',
                            color: isUser ? '#ffffff' : '#212529'
                        }}>
                            <p className="m-0 line-height-3 text-sm sm:text-base">{msg.text}</p>
                            <small className="block mt-1 text-xs" style={{
                                color: isUser ? 'rgba(255,255,255,0.8)' : '#6c757d'
                            }}>
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </small>
                        </div>
                    </div>
                )
            })}
              {responseMessages && <div
                className={`w-full sm:max-w-20rem md:max-w-25rem lg:max-w-30rem p-2 sm:p-3 border-round-2xl shadow-1 border-round-bottom-left-none`}
                style={{
                    backgroundColor: '#f8f9fa',
                    color: '#212529'
                }}>
                <h2>{responseMessages}</h2>
            </div>}
        </div>
    )
}
export default MainComponent