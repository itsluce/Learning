import {Button} from "primereact/button";
import {type Dispatch, type SetStateAction, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

const EditQuestion = ({value, setValue}: {
    value: any,
    setValue: Dispatch<SetStateAction<any[]>>
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValues, setEditValues] = useState({text: '', textArea: ''});

    console.log({value})

    const handleEdit = (item: any, index: number) => {
        setEditValues({text: item.text, textArea: item.textArea});
        setEditingIndex(index);
        setIsEditMode(true);
    };

    console.log({editValues})

    const handleSave = () => {
        if (editValues.text && editValues.textArea && editingIndex !== null) {
            setValue([editValues]);
            setIsEditMode(false);
            setEditingIndex(null);
            setEditValues({text: '', textArea: ''});
            // showToaster()
        }
    }

    const handleDelete = (item: any) => {
        setValue(prev => prev.filter((i) => i !== item));
    }

    return (
        <div>
            <div className="grid">
                {value?.map((item: any, index: number) => {
                    console.log({item})
                    return (
                        <div key={index} className="col-12">
                            {!(isEditMode && editingIndex === index) &&
                                <div
                                    className="flex flex-row justify-content-between surface-card border-round p-3 shadow-1 mb-3">
                                    <div>
                                        <h3 className="text-primary mb-2 text-sm sm:text-base">{item.text}</h3>
                                        <p className="text-600 line-height-3 m-0 text-xs sm:text-sm">{item.textArea}</p>
                                    </div>
                                    <div>
                                        <Button size={'small'} icon={'pi pi-pencil'} text
                                                onClick={() => handleEdit(item, index)}/>
                                        <Button size={'small'} icon={'pi pi-trash'} text severity={'danger'}
                                                onClick={()=>handleDelete(item)}/>
                                    </div>
                                </div>
                            }
                            {isEditMode && editingIndex === index &&
                                <div
                                    className="surface-card border-round p-3 shadow-1 mb-3">
                                    <div className="flex flex-column gap-3">
                                        <InputText
                                            value={editValues.text}
                                            onChange={(e) => {
                                                setEditValues(prev => ({...prev, text: e.target.value}))
                                            }}
                                            placeholder={'Question or Keyword'}
                                            className="w-full text-sm sm:text-base"
                                        />

                                        <InputTextarea
                                            value={editValues.textArea}
                                            onChange={(e) => {
                                                setEditValues(prev => ({...prev, textArea: e.target.value}))
                                            }}
                                            placeholder={'bot response'}
                                            className="w-full text-sm sm:text-base"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex justify-content-end gap-3 mt-3">
                                        <Button label={"Cancel"} size="small" onClick={() => {
                                            setIsEditMode(false);
                                            setEditingIndex(null);
                                            setEditValues({text: '', textArea: ''});
                                        }} severity={'secondary'}/>
                                        <Button label={"Save"} size="small" onClick={handleSave}/>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default EditQuestion;