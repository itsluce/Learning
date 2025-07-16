import {Image} from "primereact/image";
import {Settings} from "lucide-react";
import logo from '../assets/logo.jpg'
import {Dialog} from "primereact/dialog";
import {useState} from "react";
import QuestionDialog from "./QuestionDialog.tsx";

const Header = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div className={'flex flex-row align-items-center justify-content-between px-4 py-3 border-bottom-1'} 
             style={{backgroundColor: '#f8f9fa', borderColor: '#dee2e6'}}>
            <div className={'flex flex-row align-items-center gap-3'}>
                <Image src={logo} width={'50rem'} height={'50rem'}/>
                <h2>LOGO</h2>
            </div>
            <Settings className="cursor-pointer" style={{color: '#6c757d'}} onClick={() => {
                setIsDialogOpen(true)
            }}/>
            <Dialog draggable={false} showHeader={false} dismissableMask={true} visible={isDialogOpen}
                    onHide={() => {setIsDialogOpen(false)}}
                    className="w-11 md:w-6">
                <div className="p-4">
                   <QuestionDialog/>
                </div>

            </Dialog>
        </div>
    )
}
export default Header