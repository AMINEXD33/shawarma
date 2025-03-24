import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";

type formInputProps = {
    name: string;
    placeholder?: string;
    outerState?: string;
    setOuterState?: Dispatch<SetStateAction<string>>|Dispatch<SetStateAction<number>>;
    id:string,
    label:string,
    type: string,
    defaultt?:any
};
export default function FormINput({
    name,
    placeholder = "",
    outerState,
    setOuterState,
    id,
    label,
    type,
    defaultt
}: formInputProps) {

    useEffect(()=>{
        if (defaultt && setOuterState){
            setOuterState(defaultt);
        }
    }, []);
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className="formInput"
                placeholder={placeholder}
                name={name}
                defaultValue={defaultt?(type=="number"?new Number(defaultt):defaultt):("")}
                onChange={(e) => {
                    if (typeof setOuterState === "function") {
                        setOuterState(e.target.value);
                    }
                }}
                type={type}
            />
        </>
    );
}
