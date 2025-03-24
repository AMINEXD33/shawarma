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
import {ERROR, SUCCESS} from "@/redux/alerts/reducers";

type EditProductProps = {
    data: {[key:string]:any}[];
}
export default function EditProduct({
    data
}: EditProductProps) {
    const dispatcher = useDispatch();
    // normal inputs
    const [photo, setPhoto] = useState<File|undefined>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [importPrice, setImportPrice] = useState(0);
    const [deliveryPrice, setDeleveryPrice] = useState(0);
    const [title, setTitle] = useState("");

    // select dropdowns
    const [ingreds, setIngreds] = useState<element[]>([]);
    const [category, setCategory] = useState<element[]>([]);

    // checkboxes
    const [drinks, setDrinks] = useState<element2[]>([]);
    const [accomp, setAccomp] = useState<element2[]>([]);
    const [souce, setSouce] = useState<element2[]>([]);
    // slides
    const [menue, setMenue] = useState<boolean | undefined>(false);
    const [slide1, setSlide1] = useState<boolean | undefined>(false);
    const [slide2, setSlide2] = useState<boolean | undefined>(false);

    const [ingredsDataList, setIngredsDataList] = useState([]);
    const [categoryDataList, setCategoryDataList] = useState([]);

    const [souceDataList, setSouceDataList] = useState([]);
    const [drinksDataList, setDrinksDataList] = useState([]);
    const [accomDalaList, setAccomDalaList] = useState([]);


    const checkValidity = ()=>{
        for (let normalInputs of [name, description, importPrice, deliveryPrice, title]){
            if (!normalInputs){
                dispatcher(ERROR("plz fill the whole form"));
                return false;
            }
        }
        for (let selects of [ingreds, category]){
            if (selects.length<=0){
                dispatcher(ERROR("ingredients and category must at least have one element"));
                return false;
            }
        }
        return true;
    }
    const submitData = async () => {
        if (!checkValidity()){
            return;
        }
        const formData = new FormData();
        if (photo){
            formData.append("photo", photo);
        }
        formData.append("product_id", data["product"]["id"])
        formData.append("name", name);
        formData.append("description", description);
        formData.append("location", importPrice.toString());
        formData.append("delevery", deliveryPrice.toString());
        formData.append("title", title);
        formData.append("ingreds", JSON.stringify(ingreds));
        formData.append("category", JSON.stringify(category));
        formData.append("drinks", JSON.stringify(drinks));
        formData.append("accomp", JSON.stringify(accomp));
        formData.append("souce", JSON.stringify(souce));
        formData.append("menue", menue ? "true" : "false");
        formData.append("active_first_slide", slide1 ? "true" : "false");
        formData.append("active_second_slide", slide2 ? "true" : "false");

        const response = await fetch(route("updateProduct"), {
            method: "post",
            body: formData,
        });
        if (response.ok){
            dispatcher(SUCCESS("product updated"));
        }else{
            dispatcher(ERROR("can't update the product"));

        }
    };
    const getData = async () => {
        const response = await CustomFetch(route("getFormData"), "GET");

        if (response.code === "data") {
            setIngredsDataList(response.data?.["ingreds"]);
            setCategoryDataList(response.data?.["cats"]);

            setSouceDataList(response.data?.["souces"]);
            setDrinksDataList(response.data?.["drinks"]);
            setAccomDalaList(response.data?.["accom"]);
            return;
        } else {
            throw new Error("can't load from data data");
        }
    };
    useEffect(() => {
        const fs = async () => {
            await getData();
        };
        fs();
    }, []);

    useEffect(()=>{
        console.log(data);
    }, []);

    return (
        <MainDiv
            title="nouveau produits"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <form className="formgroup">
                <div
                    className="everything_horiz"
                    style={{ justifyContent: "start", marginTop: "50px" }}
                >
                    <img
                        style={{ borderRadius: "50%" }}
                        src={product}
                        alt=""
                        height={"200px"}
                        width={"200px"}
                    />
                    <input type="file" 
                        onChange={(e)=>{
                            setPhoto(e.target.files?.[0])
                        }}
                    />
                </div>
                <div className="everything_horiz">
                    <div className="p50">
                        <FormINput
                            id="nom"
                            placeholder="Nom"
                            name="Nom"
                            label="Nom"
                            type="text"
                            setOuterState={setName}
                            defaultt={data?.["product"]["name"]}
                        />
                        <div className="everything_horiz">
                            <div className="p50">
                                <FormINput
                                    id="emporter"
                                    placeholder=""
                                    name="emporter"
                                    label="Prix emporter"
                                    type="number"
                                    setOuterState={setImportPrice}
                                    defaultt={new Number(data?.["product"]["location"])}
                                />
                            </div>
                            <div className="p50">
                                <FormINput
                                    id="livraison"
                                    placeholder=""
                                    name="livraison"
                                    label="Prix livraison"
                                    type="number"
                                    setOuterState={setDeleveryPrice}
                                    defaultt={new Number(data?.["product"]["delevery"])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p50">
                        <label htmlFor="descriptionpro">Description</label>
                        <textarea
                            placeholder="Description"
                            className="textareaform"
                            name="descpription"
                            id="descriptionpro"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            defaultValue={data?.["product"]["description"]}
                        ></textarea>
                    </div>
                </div>

                <div className="sides">
                    <FormINput
                        id="title"
                        placeholder="Title"
                        name="title"
                        label="Title"
                        type="text"
                        setOuterState={setTitle}
                        defaultt={data?.["product"]["title"]}
                    />

                    <ShipSelector
                        dataList={ingredsDataList}
                        selectedItems={ingreds}
                        setSelectedItems={setIngreds}
                        id="ingred"
                        label="Ingrédients"
                        mode={1}
                        defaultt={data["product"]["ingreds"]}
                    />

                    <ShipSelector
                        dataList={categoryDataList}
                        selectedItems={category}
                        setSelectedItems={setCategory}
                        id="categoty"
                        label="Category"
                        mode={2}
                        defaultt={data["cats"]}
                    />
                </div>

                <div className="checkboxes">
                    <CheckBoxMultiple
                        label="Boisson:"
                        id="boisson"
                        name="boisson"
                        selected={drinks}
                        setSelected={setDrinks}
                        dataList={drinksDataList}
                        defaultt={data["drinks"]}
                    />

                    <CheckBoxMultiple
                        label="Accompagnement :"
                        id="accompagnement"
                        name="aoisson"
                        selected={accomp}
                        setSelected={setAccomp}
                        dataList={accomDalaList}
                        defaultt={data["coms"]}
                    />

                    <CheckBoxMultiple
                        label="Choix sauce :"
                        id="sauce"
                        name="sauce"
                        selected={souce}
                        setSelected={setSouce}
                        dataList={souceDataList}
                        defaultt={data["souce"]}
                    />
                </div>

                <div className="slidesform">
                    <div
                        className="horiz"
                        style={{ flexDirection: "row-reverse" }}
                    >
                        <p>Afficher dans le menu</p>
                        <Slider
                            id={1}
                            name={"menue"}
                            setOuterstate={setMenue}
                            initialState={data?.["product"]["active_menue"]}
                        />
                    </div>

                    <div
                        className="horiz"
                        style={{ flexDirection: "row-reverse" }}
                    >
                        <p>Produit activer dans le premier slide</p>
                        <Slider
                            id={1}
                            name={"menue"}
                            setOuterstate={setSlide1}
                            initialState={data?.["product"]["active_first_slide"]}
                        />
                    </div>

                    <div
                        className="horiz"
                        style={{ flexDirection: "row-reverse" }}
                    >
                        <p>Produit activer dans le premier slide</p>
                        <Slider
                            id={1}
                            name={"menue"}
                            setOuterstate={setSlide2}
                            initialState={data?.["product"]["active_second_slide"]}
                        />
                    </div>
                </div>

                <div className="horiz">
                    <ButtonCustom
                        text="edit"
                        type="button"
                        onClick={async () => {
                            await submitData();
                            console.log("sent");
                        }}
                    />
                </div>
            </form>
        </MainDiv>
    );
}
