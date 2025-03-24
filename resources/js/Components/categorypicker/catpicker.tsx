import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";

type catType = {
    id: number;
    name: string;
    description: string;
}

type CatpickerProps = {
    name: string;
    categoriesList: catType[];
    outerState?: number;
    setOuterState?: Dispatch<SetStateAction<number|undefined>>;
};

export default function Catpicker({
    name,
    categoriesList,
    outerState,
    setOuterState,
}: CatpickerProps) {
    const [state, setState] = useState<number|undefined>(NaN);
    const [selectedINdex, setSelectedIndex] = useState(NaN);
    useEffect(() => {
        if ((outerState !== null || outerState !== undefined) 
            && typeof setOuterState === "function") {
            setOuterState(state);
        }
    }, [state]);

    return (
        <div className="pickerslide">
            <div className="onlyfivepick">
                        <div
                            key={`catpicknone`}
                            onClick={() => {
                                setState(-1);
                                setSelectedIndex(-1);
                            }}
                            className={`cat ${selectedINdex===-1?"activeCat":""}`}
                        >
                            None
                        </div>
                {categoriesList.map((item, index) => {
                    return (
                        <div
                            key={`catpick${index}`}
                            onClick={() => {
                                setState(item.id);
                                setSelectedIndex(index);
                            }}
                            className={`cat ${index===selectedINdex?"activeCat":""}`}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
            <img src="" id="othercats" />
        </div>
    );
}
