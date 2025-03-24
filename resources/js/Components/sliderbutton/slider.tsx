import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import "./style.css";

type objectt = { [key: string | number]: any };
type SliderType = {
    initialState: boolean;
    name: string;
    outerState?: boolean;
    setOuterstate?: Dispatch<SetStateAction<boolean|undefined>>;
    conditionalToggle?: (id:number, state: boolean) => Promise<boolean>;
    id:number;
};


export default function Slider({
    initialState,
    name,
    outerState,
    setOuterstate,
    conditionalToggle,// a promise that is true or false
    id
}: SliderType) {
    const [state, setState] = useState(initialState);
    const sidebar = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (setOuterstate && typeof setOuterstate === "function") {
            setOuterstate(state);
        }
    }, [state]);

    useEffect(()=>{
        if (initialState){
            sidebar.current?.classList.remove("sliderCercleOn");
            sidebar.current?.classList.add("sliderCercleOff");
        }else{
            sidebar.current?.classList.remove("sliderCercleOff");
            sidebar.current?.classList.add("sliderCercleOn");
        }

    }, []);

    useEffect(()=>{
        console.log(initialState);
    }, []);
    const toggle = async () => {
        console.log("curr = ", state, "toggle to  = ", !state);
        if (!state) {
            sidebar.current?.classList.remove("sliderCercleOn");
            sidebar.current?.classList.add("sliderCercleOff");
        } else {
            sidebar.current?.classList.remove("sliderCercleOff");
            sidebar.current?.classList.add("sliderCercleOn");
        }
        setState(!state);
    };
    return (
        <div
            onClick={async () => {
                if (typeof conditionalToggle === "function") {
                    if (await conditionalToggle(id, state)) {
                        await toggle();
                    }
                } else {
                    await toggle();
                }
            }}
            className="sliderBase"
        >
            <div className="sidetitle">on</div>
            <div className="sidetitle">off</div>
            <div className="sliderCercle" ref={sidebar}></div>
        </div>
    );
}
