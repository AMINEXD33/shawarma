import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
import arrowDown from "@/photos/arrowdown.svg";
type SlectType = {
    name: string;
    elements: string[];
    selected: number;
    outerState: string;
    setOuterState: Dispatch<SetStateAction<string>>;
};
export default function Select({
    outerState,
    setOuterState,
    name,
    elements,
    selected,
}: SlectType) {
    const [state, setState] = useState("EN");

    useEffect(() => {
        if (
            (outerState !== null || outerState !== undefined) &&
            typeof setOuterState === "function"
        ) {
            setOuterState(state);
            console.log("heare");
        }
    }, [state]);
    return (
        <div className="selectOuterBox">
            <select
                className="selectlist"
                onChange={(e) => {
                    setState(e.target.value);
                }}
            >
                {elements.map((item, index) => {
                    if (index === selected) {
                        return (
                            <option
                                selected
                                value={item}
                                key={`selecto${index}`}
                            >
                                {item}
                            </option>
                        );
                    } else {
                        return (
                            <option key={`selecto${index}`} value={item}>
                                {item}
                            </option>
                        );
                    }
                })}
            </select>
            <img src={arrowDown} id="arrowiconselect" />
        </div>
    );
}
