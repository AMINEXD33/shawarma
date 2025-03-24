import { useCallback, useEffect, useRef, useState } from "react";
import x from "@/photos/x.svg";
import "./style.css";

export type element = { name: string; id: number };
type ShipSelectorType = {
    dataList: any[];
    selectedItems: element[];
    setSelectedItems: any;
    id:string;
    label: string;
    mode:number;
    defaultt: any
};
export default function ShipSelector({
    id,
    label,
    dataList,
    selectedItems,
    setSelectedItems,
    mode,
    defaultt,
}: ShipSelectorType) {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    const isNotAlreadySelected = useCallback((targetId: number) => {
        for (let elem of selectedItems) {
            if (elem.id === targetId) {
                return false;
            }
        }
        return true;
    }, [selectedItems]);

    const addToSelected = useCallback((element: element) => {
        if (isNotAlreadySelected(element.id)) {
            setSelectedItems([...selectedItems, element]);
        }
        setOpen(false);
    }, [selectedItems]);

    const removeSelected = useCallback((element: element) => {
        const filtered = selectedItems.filter(
            (elem: element) => (elem.id !== element.id)
        );
        setSelectedItems(filtered);
    }, [selectedItems]);

    useEffect(()=>{
        console.log(selectedItems)
    }, [selectedItems]);

    useEffect(()=>{
        if (!defaultt){
            return;
        }

        
        const arr:element[] = [];
        if (mode === 1){
            for (let elem of defaultt){
                const objecto:element = {id:elem["id"], name:elem["name_fr"]};
                arr.push(objecto);
            }
            
        }else if(mode === 2){
            for (let elem of defaultt){
                const objecto:element = {id:elem["id"], name:elem["name"]};
                arr.push(objecto);
            }
        }
        setSelectedItems([...selectedItems, ...arr]);
        


    }, []);
    return (
        <>
        <label htmlFor={id}>{label}</label>
        <div
            id={id}
            className="shipSElector"

        >
            <div className="selectedCOntaiber"
            ref={ref}
            onClick={(e) => {
                console.log(e.target);
                if (e.target === ref.current){
                    setOpen(!open);
                }
                
            }}>
            {selectedItems.map((item, index) => {
                return (
                    <div key={`seleship${index}`} className="shipselectorShip">
                        {item.name}
                        <img
                            className="shipREmoval"
                            src={x}
                            height={10}
                            width={10}
                            onClick={() => {
                                removeSelected(item);
                            }}
                        />
                    </div>
                );
            })}
            </div>
            {open && (
                <div className="shipselectorDropdown">
                    {
                        mode=== 1?
                        dataList.map((item, index) => {
                            return (
                                <div 
                                onClick={()=>{
                                    addToSelected({id:item.id, name:item.name_fr})
                                }}
                                
                                className="shipSelector">
                                    <div className="mini">
                                        <p>en: </p>
                                        <p>{item.name_en}</p>
                                    </div>
                                    <div className="mini">
                                        <p>fr: </p>
                                        <p>{item.name_fr}</p>
                                    </div>
                                    <div className="mini">
                                        <p>ni: </p>
                                        <p>{item.name_ni}</p>
                                    </div>
                                </div>
                            );
                        }):
                        dataList.map((item, index) => {
                            return (
                                <div 
                                onClick={()=>{
                                    addToSelected({id:item.id, name:item.name})
                                }}
                                
                                className="shipSelector">
                                    <div className="mini">
                                        <p>category : </p>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            )}
        </div>
        </>
    );
}
