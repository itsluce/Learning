import Header from "./components/Header.tsx";
import MainComponent from "./components/MainComponent.tsx";
import MessageSenderComponent from "./components/MessageSenderComponent.tsx";

function App() {
    return (
        <div className="flex flex-column justify-content-between" style={{width: '60%', margin: '0 auto',height:'97vh'}}>
            <div>
                <Header/>
                <MainComponent/>
            </div>
            <MessageSenderComponent/>
        </div>
    )
}

export default App
