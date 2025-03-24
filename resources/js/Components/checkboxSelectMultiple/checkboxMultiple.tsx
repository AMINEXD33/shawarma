import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./style.css";
export type element = {
    id: number;
    name: string;
    price: number;
};
type CheckBoxMultipleProps = {
    dataList: element[];
    name: string;
    id: string;
    selected: element[];
    setSelected: Dispatch<SetStateAction<element[]>>;
    label: string;
    defaultt?: element[];
};

export default function CheckBoxMultiple({
    dataList,
    name,
    id,
    label,
    selected,
    setSelected,
    defaultt
}: CheckBoxMultipleProps) {
    const [isReady, setIsReady] = useState(false);

    const isAlreadySet = (item:element)=>{
        for (let selectedItem of selected){
            if (item.id === selectedItem.id){
                return true;
            }
        }
        false;
    }

    const addToSelected = (item:element)=>{
        if (!isAlreadySet(item)){
            setSelected([...selected, item]);
        }
    }

    const removeSelected = (item:element)=>{
        const filtered = selected.filter((found:element)=>(item.id!==found.id));
        setSelected(filtered);
    }

    useEffect(()=>{
        setTimeout(()=>{ setIsReady(true);}, 200);
       
    }, [])
    useEffect(()=>{
        function inDefault (id: string){
            if (!defaultt){return;}
            for (let it of defaultt){
                if (it.id.toString() === id){
                    return it;
                }
            }
            return false;
        }
        if (!isReady){return;}
        if (!defaultt){return ;}

        const checkboxes = document.getElementsByClassName("checkboxZS");

        for (let checkBox of checkboxes){
            const checkboxid = checkBox.id;
            const it = inDefault(checkboxid);
            if (it){
                addToSelected({id:it.id, name:it.name, price:it.price});
                checkBox.checked = true;
            }
        }
    }, [isReady]);
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <div className="checkboxesList" id="id">
                {dataList.map((item, index) => {
                    return (
                        <div className="boxunite">
                            <div className="box">
                                <label>{item.name}</label>
                                <input 
                                id={item.id.toString()}
                                onChange={(e)=>{
                                    if (e.target.checked){
                                        addToSelected({id:item.id, name:item.name, price:item.price})
                                    }else{
                                        removeSelected({id:item.id, name:item.name, price:item.price})
                                    }
                                }}
                                className="checkbox checkboxZS" type="checkbox" />
                            </div>
                            <div className="price">{"+"+item.price+"€"}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
