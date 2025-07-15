import {useAppContext} from "../context/AppContext.tsx";

const MainComponent = () => {
    const {chatMessage} = useAppContext()
    console.log({chatMessage})
    return (
        <div className={'w-full'} style={{backgroundColor: 'orange', maxHeight: '100vh', minHeight: '80vh'}}>
            <h2>{chatMessage?.message}</h2>
        </div>
    )
}
export default MainComponent