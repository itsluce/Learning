import Header from "./Screens/Header.tsx";
import MainComponent from "./Screens/MainComponent.tsx";
import MessageSenderComponent from "./Screens/MessageSenderComponent.tsx";

function App() {
    return (
        <div className="min-h-screen" style={{backgroundColor: '#f8f9fa'}}>
            <div className="flex flex-column justify-content-between shadow-2 border-round-lg overflow-hidden" 
                 style={{width: '60%', margin: '0 auto', height:'95vh', marginTop: '2.5vh', backgroundColor: '#ffffff'}}>
                <div className="flex-1 flex flex-column">
                    <Header/>
                    <MainComponent/>
                </div>
                <MessageSenderComponent/>
            </div>
        </div>
    )
}

export default App
