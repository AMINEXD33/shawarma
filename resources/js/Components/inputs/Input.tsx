import { Dispatch } from "react";
import "./style.css";
interface InputCustomType{
    name?:string,
    id?: string,
    placeholder?: string,
    type?:string,
    formData?:{[key:string|number]:any},
    setFormData?: Dispatch<React.SetStateAction<{}>>
}
export default function InputCustom({
    name,
    id,
    placeholder,
    type,
    formData,
    setFormData
}:InputCustomType){

    return (
        <input
            className="inputCustom"
            name={name}
            id={id}
            placeholder={placeholder}
            type={type}
            onChange={(event)=>{
                if (formData && typeof setFormData === "function"){
                    setFormData({...formData, [event.target.name]: event.target.value});
                }
            }}
        />
    )
}