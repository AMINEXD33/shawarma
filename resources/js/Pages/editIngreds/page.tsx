import FormINput from "@/Components/formInputs/input";
import MainDiv from "@/Components/mainDiv";
import "./style.css";
import ShipSelector from "@/Components/shipselector/shipselector";
import { useEffect, useState } from "react";
import product from "@/photos/plate.svg";
import { element } from "@/Components/shipselector/shipselector";
import CheckBoxMultiple from "@/Components/checkboxSelectMultiple/checkboxMultiple";
import Slider from "@/Components/sliderbutton/slider";
import ButtonCustom from "@/Components/buttons/Button";
import CustomFetch from "@/customFetch";
import { element as element2 } from "@/Components/checkboxSelectMultiple/checkboxMultiple";
import { useDispatch } from "react-redux";
import { ERROR, SUCCESS } from "@/redux/alerts/reducers";
import InputCustom from "@/Components/inputs/Input";

type EditProductProps = {
    data: { [key: string]: any }[];
};
export default function EditIngred({ data }: EditProductProps) {
    const dispatcher = useDispatch();
    // normal inputs
    const [fr, setFr] = useState("");
    const [en, setEn] = useState("");
    const [ni, setNi] = useState("");

    const update = async ()=>{
        let response = await CustomFetch(route("updateIngred"), "POST", JSON.stringify({
            id: data["ingreds"]["id"],
            fr: fr,
            en: en,
            ni: ni
        }));

        if (response.code==="data"){
            dispatcher(SUCCESS("Ingrediant updated"));
        }
        else{
            dispatcher(ERROR("can't update ingrediant"));
        }
    }


    useEffect(() => {
        setFr(data["ingreds"]["name_fr"]);
        setEn(data["ingreds"]["name_en"]);
        setNi(data["ingreds"]["name_ni"]);
    }, []);
    return (
        <MainDiv
            title="Edit ingrédients"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <FormINput 
            setOuterState={setFr}
            defaultt={data["ingreds"]["name_fr"]}
            name="fr" id="fr" label="Nom(FR)" type="text" />

            <FormINput 
            setOuterState={setEn}
            defaultt={data["ingreds"]["name_en"]}
            name="en" id="en" label="Nom(EN)" type="text" />

            <FormINput 
            setOuterState={setNi}
            defaultt={data["ingreds"]["name_ni"]}
            name="ni" id="ni" label="Nom(NI)" type="text" />
            <div style={{marginTop:"20px"}}>
            <ButtonCustom
                text="edit"
                type="button"
                onClick={async ()=>{await update()}}
            />
            </div>


        </MainDiv>
    );
}
