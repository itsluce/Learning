import {useAppContext} from "./context/AppContext";

const ContextUsage = () => {
    const {number} = useAppContext()
    return (
        <div>
            <h2>{number}</h2>
        </div>
    )
}
export default ContextUsage