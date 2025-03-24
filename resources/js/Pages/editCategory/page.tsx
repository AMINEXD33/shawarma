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
export default function EditCategory({ data }: EditProductProps) {
    const dispatcher = useDispatch();
    // normal inputs
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [meta, setMeta] = useState("");
    const [photo, setPhoto] = useState<File>();

    const update = async ()=>{
        let formData = new FormData();
        formData.append("id", data["category"]["id"])
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("meta", meta);
        if (photo){
            formData.append("photo", photo);
        }
        
        
        const response =  await fetch(route("updateCategory"), {
            method:"POST",
            body: formData,
        })

        if (response.ok){
            dispatcher(SUCCESS("Ingrediant updated"));
        }
        else{
            dispatcher(ERROR("can't update ingrediant"));
        }
    }


    useEffect(() => {
        setName(data["category"]["name"]);
        setDesc(data["category"]["description"]);
        setMeta(data["category"]["metatitle"]);
    }, []);
    return (
        <MainDiv
            title="Edit ingrédients"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <input 
                type="file"
                onChange={(e)=>{setPhoto(e.target.files?.[0])}}
            />
            <div>
            <FormINput 
            setOuterState={setName}
            defaultt={data["category"]["name"]}
            name="fr" id="fr" label="nom" type="text" />

            <FormINput 
            setOuterState={setDesc}
            defaultt={data["category"]["description"]}
            name="en" id="en" label="description" type="text" />

            <FormINput 
            setOuterState={setMeta}
            defaultt={data["category"]["metatitle"]}
            name="ni" id="ni" label="metatitle" type="text" />
            <div style={{marginTop:"20px"}}>
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
