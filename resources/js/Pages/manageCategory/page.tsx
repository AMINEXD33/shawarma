import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import MainDiv from "../../Components/mainDiv";
import "./style.css";
import Slider from "@/Components/sliderbutton/slider";
import Search from "@/Components/search/search";
import AddButton from "@/Components/addbutton/addbutton";
import Select from "@/Components/select/select";
import Catpicker from "@/Components/categorypicker/catpicker";
import { Table } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import ContentTable from "@/Components/contentTable3/contentTable";
import CustomFetch from "@/customFetch";
import { tableElement } from "@/Components/contentTable3/contentTable";
import useDebounce from "@/deboucer/debouncer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {ERROR, SUCCESS} from "@/redux/alerts/reducers";

export default function ManageCats() {
    const alerts = useSelector((state:RootState)=>state.alerts);
    const dispatcher = useDispatch();

    // search params
    const [formData, setFormData] = useState({});
    const [search, setSearch] = useState("");
    const [lang, setLang] = useState("EN");
    const [pickCat, setPickCat] = useState<number|undefined>();
   
    // data is ready?
    const [dataReady, setDataReady] = useState(true);
    const [originalData, setOriginalDara] =  useState<tableElement[]>([]);
    const [dataList, setDataList] = useState<tableElement[]>([]);
    const [categoryList, setCategoryList] = useState([]);
    
    // search
    const smartSearch = async()=>{
        // if search is clear reset data
        // if ((search === "" || !search) && pickCat === -1){
        //     setDataList(originalData);
        //     return;
        // }
        // no data found , hit the server
        // setDataReady(false);
        // const response = await CustomFetch(route("searchProducts"), "POST", JSON.stringify({
        //     search: search,
        //     cat: pickCat===-1?null: pickCat
        // }));
        // setDataReady(true);
        // if (response.code === "data"){
        //     console.log(response.data);
        //     if (!response.data?.["products"]){
        //         setDataList([]);
        //     }else{
        //         setDataList(response.data?.["products"]);
        //     }
        // }else{
        //     dispatcher(ERROR("Search error"));
        // }
    }
    // debouncer
    const debouncer  = useDebounce(async ()=>await smartSearch(), 500);
    // toggle safe guard
    const safeToToggle = useCallback(async () => {
        return true;
    }, [formData]);
    // run debouncer
    useEffect(()=>{
            debouncer();
    }, [search, pickCat]);


    // get products
    const getData = useCallback(async ()=>{
        const result = await CustomFetch(route("getCategories"), "GET");
        console.log("called");
        if (result.code==="data"){
            const data_: tableElement[] = result.data?.["categories"];
            console.log("categoryes=>", data_);
            setDataList(data_);
            setOriginalDara(data_);
        }else{
            console.log("error");
        }
    }, []);
    // run getting data
    useEffect(()=>{
        const fs = async ()=> await getData();
        fs();
    }, []);

    const editCallback = async (id: number)=>{
        location.assign(route('editCat', {cat_id: id}))
    }

    const deleteCallback = async (
        divRef:string, 
        productId:number
    )=>{
        const div = document.getElementById(divRef);
        const result = await CustomFetch(route("deleteCat"), "POST", JSON.stringify({
            id: productId
        }));
        if (result.code==="data"){
            dispatcher(SUCCESS("product deleted"));
            if (div){
                div.remove();
            }
        }else{
            dispatcher(ERROR("can't delete this product"));
        }
    }
    return (
        <MainDiv
            title="gestion des category"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <div className="actionpanel">
                <div className="grouping" style={{justifyContent:"end", width:"100%"}}>
                    <Search
                        name="product"
                        placeHolder="Recherche"
                        search={search}
                        setSearch={setSearch}
                    />
                    <AddButton
                        withIcon={true}
                        content="nouveau category"
                        onClickAction={async () => {
                            location.assign(route("addCategory"));
                        }}
                    />
                    
                </div>
            </div>

            <div className="dataactions">
                {!dataReady ? (
                    <Spinner animation="border" color="#D11253" style={{
                        color:"#D11253",
                        width:"50px", 
                        height:"50px"}}/>
                ) : (
                    <ContentTable
                        dataList={dataList}
                        loading={dataReady}
                        lang={lang}
                        actions={
                            {
                                editCallback: editCallback,
                                deleteCallback: deleteCallback
                            }
                        }
                    />
                )}
            </div>
        </MainDiv>
    );
}
