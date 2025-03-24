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
export default function EditPromos({ data }: EditProductProps) {
    const dispatcher = useDispatch();
    // normal inputs
    const [code, setCode] = useState("");
    const [value, setValue] = useState("");

    const update = async ()=>{
        let response = await CustomFetch(route("updatePromo"), "POST", JSON.stringify({
            id: data["promo"]["id"],
            code: code,
            value: value,
        }));

        if (response.code==="data"){
            dispatcher(SUCCESS("Ingrediant updated"));
        }
        else{
            dispatcher(ERROR("can't update ingrediant"));
        }
    }


    useEffect(() => {
        setCode(data["promo"]["code"]);
        setValue(data["promo"]["value"]);
    }, []);
    return (
        <MainDiv
            title="Edit Promos"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <div style={{marginTop:"20px"}}>
                <FormINput 
                setOuterState={setCode}
                defaultt={data["promo"]["code"]}
                name="code" id="code" label="code" type="text" />

                <FormINput 
                setOuterState={setValue}
                defaultt={data["promo"]["value"]}
                name="value" id="value" label="valeur" type="text" />
                <div style={{marginTop:'20px'}}>
                <ButtonCustom
                    text="edit"
                    type="button"
                    onClick={async ()=>{await update()}}
                />
                </div>

            </div>
            
           


        </MainDiv>
    );
}
