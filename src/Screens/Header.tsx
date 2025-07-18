import {Image} from "primereact/image";
import {Settings} from "lucide-react";
import logo from '../assets/logo.jpg'
import {Dialog} from "primereact/dialog";
import {useState} from "react";
import QuestionDialog from "../components/QuestionDialog.tsx";

const Header = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div className={'flex flex-row align-items-center justify-content-between px-2 sm:px-4 py-3 border-bottom-1'} 
             style={{backgroundColor: '#f8f9fa', borderColor: '#dee2e6'}}>
            <div className={'flex flex-row align-items-center gap-2 sm:gap-3'}>
                <Image src={logo} width={'40rem'} height={'40rem'} className="sm:w-full sm:h-full"/>
                <h2 className="text-lg sm:text-xl lg:text-2xl m-0">LOGO</h2>
            </div>
            <Settings className="cursor-pointer w-1rem h-1rem sm:w-1rem sm:h-1rem" style={{color: '#6c757d'}} onClick={() => {
                setIsDialogOpen(true)
            }}/>
            <Dialog draggable={false} showHeader={false} dismissableMask={true} visible={isDialogOpen}
                    onHide={() => {setIsDialogOpen(false)}}
                    className="w-11 md:w-8 lg:w-6">
                <div className="p-2 sm:p-4">
                   <QuestionDialog/>
                </div>

            </Dialog>
        </div>
    )
}
export default Header