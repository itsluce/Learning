import {useAppContext} from "../context/AppContext.tsx";

const MainComponent = () => {
    const {chatMessage} = useAppContext()
    return (
        <div className={'w-full p-3 flex-1 overflow-y-auto'} style={{backgroundColor: '#ffffff'}}>

            {chatMessage.map((msg)=>{
                const isUser = msg.sender === 'user';
                return(
                    <div key={msg.id} className={`flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`max-w-20rem p-3 border-round-2xl shadow-1 ${
                            isUser 
                                ? 'border-round-bottom-right-none' 
                                : 'border-round-bottom-left-none'
                        }`} style={{
                            backgroundColor: isUser ? '#007bff' : '#f8f9fa',
                            color: isUser ? '#ffffff' : '#212529'
                        }}>
                            <p className="m-0 line-height-3">{msg.text}</p>
                            <small className="block mt-1 text-xs" style={{
                                color: isUser ? 'rgba(255,255,255,0.8)' : '#6c757d'
                            }}>
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </small>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default MainComponent