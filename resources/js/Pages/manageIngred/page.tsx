import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import MainDiv from "../../Components/mainDiv";
import "./style.css";
import Slider from "@/Components/sliderbutton/slider";
import Search from "@/Components/search/search";
import AddButton from "@/Components/addbutton/addbutton";
import Select from "@/Components/select/select";
import Catpicker from "@/Components/categorypicker/catpicker";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ContentTable from "@/Components/contentTable2/contentTable";
import CustomFetch from "@/customFetch";
import { tableElement } from "@/Components/contentTable2/contentTable";
import useDebounce from "@/deboucer/debouncer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ERROR, SUCCESS } from "@/redux/alerts/reducers";
import FormINput from "@/Components/formInputs/input";
import ButtonCustom from "@/Components/buttons/Button";

export default function ManageIngred() {
    const alerts = useSelector((state: RootState) => state.alerts);
    const [en, setEn] = useState("");
    const [fr, setFr] = useState("");
    const [ni, setNi] = useState("");
    const dispatcher = useDispatch();
    const [firstREnder, setFirstREnder] = useState(true);
    // search param
    const [search, setSearch] = useState("");

    // data is ready?
    const [dataReady, setDataReady] = useState(true);
    const [originalData, setOriginalDara] = useState<tableElement[]>([]);
    const [dataList, setDataList] = useState<tableElement[]>([]);

    // search
    const smartSearch = async () => {
        // if search is clear reset data
        if (search === "" || !search) {
            setDataList(originalData);
            return;
        }
        // no data found , hit the server

        const filterd = originalData.filter((item)=>(
            (item.name_en.toLowerCase() === search.toLowerCase()) ||
            (item.name_fr.toLowerCase() === search.toLowerCase()) ||
            (item.name_ni.toLowerCase() === search.toLowerCase())
        )
        );
        setDataList(filterd);
    };
    // debouncer
    const debouncer = useDebounce(async () => await smartSearch(), 500);

    // run debouncer
    useEffect(() => {
        if (firstREnder) {
            setFirstREnder(false);
            return;
        }
        debouncer();
    }, [search]);

    // get products
    const getData = useCallback(async () => {
        const result = await CustomFetch(route("getIngred"), "GET");
        console.log("called");
        if (result.code === "data") {
            const data_: tableElement[] = result.data?.["ingreds"];
            console.log(data_);
            setDataList(data_);
            setOriginalDara(data_);
        } else {
            console.log("error");
        }
    }, []);
    // run getting data
    useEffect(() => {
        const fs = async () => await getData();
        fs();
    }, []);

    const addIngred = async ()=>{
        const response = await CustomFetch(route("addIngred"), "POST", JSON.stringify({
            "en": en,
            "fr": fr,
            "ni": ni
        }));
        if (response.code === "data"){
            setOriginalDara([...originalData, response.data["ingred"]]);
            setDataList([...dataList, response.data["ingred"]]);
            dispatcher(SUCCESS("Ingrediant was added"));
        }
        else{
            dispatcher(ERROR("Can't add the ingrediant"));
        }
    }

    const editCallback = async (id: number) => {
        location.assign(route("editIngred", { id: id }));
    };

    const deleteCallback = async (divRef: string, productId: number) => {
        const div = document.getElementById(divRef);
        const result = await CustomFetch(
            route("deleteIngredUnite"),
            "POST",
            JSON.stringify({
                id: productId,
            })
        );
        if (result.code === "data") {
            dispatcher(SUCCESS("Ingrediant deleted"));
            if (div) {
                div.remove();
            }
        } else {
            dispatcher(ERROR("can't delete this Ingrediant"));
        }
    };
    return (
        <MainDiv
            title="gestion des Ingrediants"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <div className="actionpanel">
                <div className="grouping ssearch">
                    <Search
                        name="product"
                        placeHolder="Recherche"
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
            </div>

            <div className="hrexxd2">
            <div className="dataactions">
                {!dataReady ? (
                    <Spinner
                        animation="border"
                        color="#D11253"
                        style={{
                            color: "#D11253",
                            width: "50px",
                            height: "50px",
                        }}
                    />
                ) : (
                    <ContentTable
                        dataList={dataList}
                        loading={dataReady}
                        lang={"asd"}
                        actions={{
                            editCallback: editCallback,
                            deleteCallback: deleteCallback,
                        }}
                    />
                )}</div>
                <div className="otherform">
                    <div className="header">
                        <h4>nouveau ingrédient</h4>
                    </div>
                    <FormINput
                        id="namefr"
                        name="namefr"
                        label="Nom (Fr)"
                        type="text"
                        setOuterState={setFr}
                    />

                    <FormINput
                        id="namefr"
                        name="namefr"
                        label="Nom (En)"
                        type="text"
                        setOuterState={setEn}
                    />

                    <FormINput
                        id="namefr"
                        name="namefr"
                        label="Nom (Ni)"
                        type="text"
                        setOuterState={setNi}
                    />

                    <ButtonCustom
                        style={{width:"80%"}}
                        text="ajouter"
                        type="button"
                        onClick={async()=>{
                            await addIngred()
                        }}
                    />
                </div>
            </div>

        </MainDiv>
    );
}
