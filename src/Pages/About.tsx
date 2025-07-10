import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const About = ()=>{
        const Navigate = useNavigate();

    return(
        <div>
            <h2>About Page</h2>
            <Button onClick={()=>{Navigate('/')}} label={'To Home Page'}/>
            <Button onClick={()=>{Navigate(-1)}} label={'Back'}/>
        </div>
    )
}
export default About