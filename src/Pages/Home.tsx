import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const Home = ()=>{

    const Navigate = useNavigate();
    return(
        <div>
            <h2>Home Page</h2>
            <Button onClick={()=>{Navigate('/about')}} label={'To About Page'}/>
        </div>
    )
}
export default Home