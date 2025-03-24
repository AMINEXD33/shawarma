import { Table } from "react-bootstrap";
import "./style.css";
import Slider from "../sliderbutton/slider";
import deleteicon from "@/photos/delete.svg";
import editicon from "@/photos/edit.svg";
import IngredShip from "../ingredship/ingredship";
import { LegacyRef, MutableRefObject, useMemo, useRef } from "react";
import CustomFetch from "@/customFetch";

type ingreds = {
    id: number;
    name_fr: string;
    name_en: string;
    name_ni: string;
};
export type tableElement = {
    id: number;
    name: string;
    description: string;
    metatitle: string;
    active_menue: boolean;
    photo: string;
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


    const filterForDeleted = async (
        ship: MutableRefObject<HTMLDivElement | undefined>
    ) => {
        if (ship.current) {
            ship.current.remove();
        }
    };
    const deleteIngred = async (
        productId: number,
        ingredId: number,
        ship: MutableRefObject<HTMLDivElement | undefined>
    ) => {
        const result = await CustomFetch(
            route("deleteIngred"),
            "POST",
            JSON.stringify({
                productId: productId,
                ingredId: ingredId,
            })
        );

        if (result.code === "data") {
            filterForDeleted(ship);
        } else {
        }
    };

    const slide1State = async (id: number, state: boolean) => {
        const result = await CustomFetch(
            route("productActiveSlides"),
            "POST",
            JSON.stringify({
                slide1: !state,
                product_id: id,
            })
        );
        if (result.code === "data") {
            return true;
        }
        return false;
    };
    const slide2State = async (id: number, state: boolean) => {
        const result = await CustomFetch(
            route("productActiveSlides"),
            "POST",
            JSON.stringify({
                slide2: !state,
                product_id: id,
            })
        );
        if (result.code === "data") {
            return true;
        }
        return false;
    };

    return (
        <Table className="Contenttable" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>photo</th>
                    <th>name</th>
                    <th>description</th>
                    <th>metatitle</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {dataList.map((item, index) => {
                    return (
                        <tr id={`tableelement${index}`} key={`tableelement${index}`} className="Tablecell">
                            <td>
                            <img
                            style={{width:"80px", height:"80px"}} 
                            src={"./storage/"+item.photo}/></td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.metatitle}</td>
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
