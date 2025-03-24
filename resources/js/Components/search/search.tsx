import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
import searchIncon from "@/photos/search.svg";

type objectt = { [key: string | number]: any };
type SearchType = {
    name: string;
    search?: string;
    setSearch?: Dispatch<SetStateAction<string>>;
    placeHolder:string
};


export default function Search({
    name,
    search, 
    setSearch,
    placeHolder="",
}:SearchType)
{
    const [state, setState] = useState("");

    useEffect(() => {
        if ((search !== null || search !== undefined) && typeof setSearch === "function") {
            setSearch(state);
        }
    }, [state]);


    return (
        <div className="searchbox">
            <input
                id="searchbox"
                onChange={(e)=>{setState(e.target.value)}}
                placeholder={placeHolder}
            />
            <img id="searchicon" src={searchIncon} style={{width:"20px", height:"20px"}}/>
        </div>

    )
}