import {Image} from "primereact/image";
import {Settings} from "lucide-react";
import logo from '../assets/logo.jpg'
import {Dialog} from "primereact/dialog";
import {useState} from "react";

const Header = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div className={'flex flex-row align-items-center justify-content-between px-4 py-2'}
             style={{backgroundColor: 'red'}}>
            <div className={'flex flex-row align-items-center gap-3'}>
                <Image src={logo} width={'50rem'} height={'50rem'}/>
                <h2>LOGO</h2>
            </div>
            <Settings onClick={() => {
                setIsDialogOpen(true)
            }}/>
            <Dialog draggable={false} showHeader={false} dismissableMask={true} visible={isDialogOpen}
                    onHide={() => {setIsDialogOpen(false)}}
                    style={{width: '50vw'}}>
                <h2>dialog opened</h2>
            </Dialog>
        </div>
    )
}
export default Header