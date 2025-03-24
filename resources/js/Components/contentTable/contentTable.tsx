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
    photo: string;
    active_first_slide: number;
    active_second_slide: number;
    name: string;
    description: string;
    ingreds: ingreds[];
    location: number;
    delevery: number;
    title: string;
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

    const data = useMemo(() => dataList, [dataList]);

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
                    <th>Slide1</th>
                    <th>Slide2</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Emporter</th>
                    <th>Livraison</th>
                    <th>Ingrediants</th>
                    <th>Title</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr id={`tableelement${index}`} key={`tableelement${index}`} className="Tablecell">
                            <td>
                                <img
                                    src={`./storage/${item.photo}`}
                                    className="cellimg"
                                />
                            </td>
                            <td>
                                <Slider
                                    id={item.id}
                                    name="slide1"
                                    initialState={
                                        item.active_first_slide == 1
                                            ? true
                                            : false
                                    }
                                    conditionalToggle={slide1State}
                                />
                            </td>
                            <td>
                                <Slider
                                    id={item.id}
                                    name="slide2"
                                    initialState={
                                        item.active_second_slide == 1
                                            ? true
                                            : false
                                    }
                                    conditionalToggle={slide2State}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                <p className="overflowp">{item.description}</p>
                            </td>
                            <td>{item.location}</td>
                            <td>{item.delevery}</td>
                            <td>
                                <div className="ingredstable">
                                    {item.ingreds.map((ingred, ingredIndex) => {
                                        return (
                                            <IngredShip
                                                className="ingredship"
                                                ingredId={ingred.id}
                                                productId={item.id}
                                                title={
                                                    (lang === "EN" &&
                                                        ingred.name_en) ||
                                                    (lang === "FR" &&
                                                        ingred.name_fr) ||
                                                    (lang === "NI" &&
                                                        ingred.name_ni) ||
                                                    ""
                                                }
                                                key={`ingredIndex${ingredIndex}`}
                                                onClickRoutine={deleteIngred}
                                            />
                                        );
                                    })}
                                </div>
                            </td>
                            <td>{item.title}</td>
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
