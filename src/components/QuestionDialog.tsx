import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {useRef, useState} from "react";
import {Toast} from "primereact/toast";

const QuestionsDialog = () => {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState({
        text: "",
        textArea: "",
    });
    const [value, setValue] = useState<any[]>([]);
    const toast = useRef(null);

    const showToaster = () => {
        toast?.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Knowledge Added Successfully',
            life: 3500
        });
    };
    const handleSave = () => {
        if (inputValue.text && inputValue.textArea) {
            setValue(prev => [...prev, inputValue]);
            setInputValue({text: '', textArea: ''});
            setShow(false)
            showToaster()
        }
    }

    return (
        <div className="p-2 sm:p-4">
            <div className="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                <h2 className="m-0 text-lg sm:text-xl"> Knowledge Base ({value.length}) </h2>
                <Button label={show ? "Hide" : "Add"} severity={show ? 'danger' : 'success'} 
                        size="small" className="w-full sm:w-auto" onClick={() => {
                    setShow(!show)
                }}/>
            </div>

            {show &&
                <div className="surface-card border-round p-3 sm:p-4 mb-3 sm:mb-4 shadow-2">
                    <h2 className="mb-3 text-base sm:text-lg">Add New Response</h2>
                    <div className="flex flex-column gap-3">
                        <InputText
                            value={inputValue.text}
                            onChange={(e) => {
                                setInputValue(prev => ({...prev, text: e.target.value}))
                            }}
                            placeholder={'Question or Keyword'}
                            className="w-full text-sm sm:text-base"
                        />

                        <InputTextarea
                            value={inputValue.textArea}
                            onChange={(e) => {
                                setInputValue(prev => ({...prev, textArea: e.target.value}))
                            }}
                            placeholder={'bot response'}
                            className="w-full text-sm sm:text-base"
                            rows={3}
                        />
                        <div className="flex justify-content-end gap-3">
                            <Button label={"Cancel"} size="small" onClick={()=>{setShow(false)}} severity={'secondary'}/>
                            <Button label={"Save"} size="small" onClick={handleSave}/>
                        </div>
                    </div>
                </div>
            }
            <div className="grid">
                {value.map((item: any, index) => {
                    return (
                        <div key={index} className="col-12">
                            <div className="surface-card border-round p-3 shadow-1 mb-3">
                                <h3 className="text-primary mb-2 text-sm sm:text-base">{item.text}</h3>
                                <p className="text-600 line-height-3 m-0 text-xs sm:text-sm">{item.textArea}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Toast ref={toast}/>
        </div>
    )
}
export default QuestionsDialog;