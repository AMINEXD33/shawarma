import { Table } from "react-bootstrap";
import "./style.css";
import Slider from "../sliderbutton/slider";
import deleteicon from "@/photos/delete.svg";
import editicon from "@/photos/edit.svg";
import IngredShip from "../ingredship/ingredship";
import { LegacyRef, MutableRefObject, useEffect, useMemo, useRef } from "react";
import CustomFetch from "@/customFetch";

type ingreds = {
    id: number;
    name_fr: string;
    name_en: string;
    name_ni: string;
};
export type tableElement = {
    id: number;
    code: string;
    value: number;
};

type ContentTableProps = {
    loading: boolean;
    dataList: tableElement[];
    actions: {
        editCallback: (id:number) => Promise<void>;
        deleteCallback: (divRef:string, productId:number) => Promise<void>;
    };
    lang: string;
};

export default function ContentTable({
    loading,
    dataList,
    actions,
    lang,
}: ContentTableProps) {
    type ingredCont = MutableRefObject<HTMLDivElement> | null;


    useEffect(()=>{
        console.log("data list = ", dataList);
    },[dataList]);
    return (
        <Table className="Contenttable" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>reference</th>
                    <th>code</th>
                    <th>valeur</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {dataList.map((item, index) => {
                    return (
                        <tr id={`tableelement${index}`} key={`tableelement${index}`} className="Tablecell">
                            <td>{item.id}</td>
                            <td>{item.code}</td>
                            <td>{item.value}</td>
                            <td>
                                <div className="actionsimgs">
                                    <img 
                                    onClick={()=>{
                                        actions.deleteCallback(`tableelement${index}`, item.id);
                                    }}
                                    src={deleteicon} />
                                    <img 
                                    onClick={()=>{actions.editCallback(item.id)}}
                                    src={editicon} />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}
