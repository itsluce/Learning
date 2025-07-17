import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {useState} from "react";

const QuestionsDialog = () => {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState({
        text: "",
        textArea: "",
    });
    const [value, setValue] = useState([{}]);
         const handleSave = () => {
            if (inputValue.text && inputValue.textArea){
                setValue(prev=>[...prev,inputValue]);
            }
         }
    return (
        <div>
            <h2> knowledge base </h2>
            <Button label={"Add"} onClick={() =>{setShow(true)}}/>

            { show &&
                <div>
                    <h2> add new response </h2>
                    <InputText value={inputValue.text} onChange={(e)=>{setInputValue(prev=>({...prev,text:e.target.value}))}} placeholder={'Question or KeyWord'}/>
                    <InputTextarea value={inputValue.textArea} onChange={(e)=>{setInputValue(prev=>({...prev,textArea:e.target.value}))}} placeholder={'bot response'}/>

                    <Button label={"Save"} onClick={handleSave}/>
                    <Button label={"Save"} onClick={handleSave}/>
                </div>
            }

        </div>
    )
}
export default QuestionsDialog;