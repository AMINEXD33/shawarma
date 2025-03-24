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

export default function AddCategory() {
    const dispatcher = useDispatch();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [meta, setMeta] = useState("");
    const [photo, setPhoto] = useState<File>();

    const submitData = async () => {
        const formData = new FormData();
        if (photo){
            formData.append('photo', photo);
        }
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('meta', meta);
        const response = await fetch(route("addCategoryy"), {
            method:"POST",
            body: formData
        });
        if (response.ok){
            dispatcher(SUCCESS("category added"));
        }else{
            dispatcher(ERROR("can't add category"))
        }

    };



    return (
        <MainDiv
            title="nouveau category"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <form className="formgroup">
               
                    <div className="p50">
                        <input 
                            type="file"
                            onChange={(e)=>{
                                setPhoto(e.target.files?.[0]);
                            }}
                        />
                        <FormINput
                            id="nom"
                            placeholder="Nom"
                            name="Nom"
                            label="Nom"
                            type="text"
                            setOuterState={setName}
                        />
                        <FormINput
                            id="description"
                            placeholder="description"
                            name="description"
                            label="Description"
                            type="text"
                            setOuterState={setDesc}
                        />
                        <FormINput
                            id="metatitle"
                            placeholder="metatitle"
                            name="metatitle"
                            label="Metatitle"
                            type="text"
                            setOuterState={setMeta}
                        />
                    </div>


                <div className="horiz">
                    <ButtonCustom
                        text="ajouter"
                        type="button"
                        onClick={async () => {
                            await submitData();
                        }}
                    />
                </div>
            </form>
        </MainDiv>
    );
}
