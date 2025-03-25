import MainDiv from "@/Components/mainDiv";
import "./style.css";

import CustomFetch from "@/customFetch";
import img from "@/photos/things.svg";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import editIcon from "@/photos/editss.svg";
import FormINput from "@/Components/formInputs/input";
import Slider from "@/Components/sliderbutton/slider";
import { link } from "fs";
import add from "@/photos/add.svg";
import burger from "@/photos/burgerrrr.svg";
type ManageSlidesProps = {};
type slide = {
    id: number;
    title: string;
    description: string;
    title_size: number;
    second_title: string;
    second_title_size: number;
    action: boolean;
    button: string;
    link: string;
    photo: string | null;
};
type category = {
    photo: string|null,
    name: string,
    description: string,
    metatitle: string,
    active_menue: boolean,
}
export default function ManageSlides() {
    const [modificationTarget, setModificationTarget] = useState<number | null>(
        null
    );
    const [itemX, setItemX] = useState<slide | null>(null);
    const [cat, setCat] = useState<category[]|null>([
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        },
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        },
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        },
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        },
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        },
        {
            photo: burger,
            name: "aodihasd",
            description: "asfafjasas",
            metatitle: "aosihad",
            active_menue: true
        }
    ]);
    const [formData , setFormData]= useState<slide>({
        id: 0,
        title: "",
        title_size: 0,
        second_title: "",
        second_title_size: 0,
        action: false,
        button: "",
        link: "",
        photo: "",
        description: "",

    });
    const [slides, setSlides] = useState<slide[]>([
        {
            id: 0,
            title: "fghjhfgfghfgh",
            description: "swerwfwe",
            title_size: 10,
            second_title: "xcvxcvxcvxcv",
            second_title_size: 12,
            action: false,
            button: "tyjtyjtyj",
            link: "aspohafhjtjtyiapf",
            photo: null,
        },
        {
            id: 1,
            title: "sdfasdsacvxcvx",
            description: "werwrwr2342",
            title_size: 10,
            second_title: "fokajfoa",
            second_title_size: 12,
            action: true,
            button: "adpojada",
            link: "ereg",
            photo: null,
        },
        {
            id: 2,
            title: "werwrwer",
            description: "hwertwyqertq3gt",
            title_size: 10,
            second_title: "fokajfoa",
            second_title_size: 12,
            action: false,
            button: "adpojada",
            link: "aspohafhiapf",
            photo: null,
        },
    ]);

    const getSlides = async () => {
        const response = await CustomFetch(route("getSlides"), "GET");
        if (response.code === "data") {
        } else {
        }
    };
    useEffect(() => {
        const elementX = slides.find((item) => item.id === modificationTarget);
        console.log("element X=>", elementX);
        if (elementX) {
            setItemX(elementX);
            setFormData(
                {
                    id: elementX.id,
                    title: elementX.title,
                    title_size: elementX.title_size,
                    second_title: elementX.second_title,
                    second_title_size: elementX.second_title_size,
                    action: elementX.action,
                    button: elementX.button,
                    link: elementX.link,
                    photo: elementX.photo,
                    description: elementX.description
                }
            )
        } else {
            setItemX(null);
        }
    }, [modificationTarget]);
    return (
        <MainDiv
            title="gestion de contenu"
            subtitle="veuillez seléctionnner un thémes pour votre site"
        >
            <div style={{ marginTop: "50px" }}>
                <h1>Gestion des slides</h1>
                <Carousel style={{ height: "500px", overflow: "hidden" }}>
                    {slides.map((item) => {
                        return (
                            <div className="imgCont">
                                {item.photo ? (
                                    <img
                                        src={"./storage/" + item.photo}
                                        className="carocelImg"
                                    />
                                ) : (
                                    <img src={img} className="carocelImg" />
                                )}

                                <div
                                    className="edittoo"
                                    onClick={() => {
                                        console.log("clicked");

                                        setModificationTarget(item.id);
                                    }}
                                >
                                    <img src={editIcon} className="editthis" />
                                </div>
                                <div
                                    className="addtoo"
                                    onClick={() => {
                                        console.log("clicked");

                                        setModificationTarget(item.id);
                                    }}
                                >
                                    <img src={add} className="editthis" />
                                </div>
                                <div className="centereveryting">
                                    <h2 style={{ fontSize: item.title_size }}>
                                        {item.title}
                                    </h2>
                                    <h1
                                        style={{
                                            fontSize: item.second_title_size,
                                            color: "white",
                                        }}
                                    >
                                        {item.second_title}
                                    </h1>
                                    <button
                                        style={{
                                            color: "white",
                                            marginTop: "30px",
                                        }}
                                        className="curButton"
                                        disabled={item.action}
                                    >
                                        {item.button}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>

            <div style={{ marginTop: "50px" }}>
                {itemX!==null && (
                    <>
                        <div className="sjsyw">
                            <h1>APROPOS</h1>
                            <div className="sss">
                                <Slider
                                    name="activeapropo"
                                    id={12}
                                    initialState={false}
                                />
                                <p>Apropos est activé</p>
                            </div>
                        </div>
                        <div className="p50">
                            <div className="imageff">
                                <img
                                    src={
                                        slides.find(
                                            (item) =>
                                                item.id === modificationTarget
                                        )?.photo !== null
                                            ? slides.find(
                                                  (item) =>
                                                      item.id ===
                                                      modificationTarget
                                              )?.photo
                                            : img
                                    }
                                />
                            </div>
                            <div className="formff">
                                <div className="formgroup">
                                    <div className="horz">
                                        <label htmlFor="inp1">Titre</label>
                                        <input
                                            id="inp1"
                                            placeholder="Title"
                                            type="text"
                                            value={formData.title}
                                        />
                                    </div>
                                    <div className="horz">
                                        <input
                                            id="inp2"
                                            placeholder="10px"
                                            type="number"
                                            value={formData.title_size}
                                        />
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <div className="horz">
                                        <label htmlFor="inp3">
                                            Sous-titre (Fr)
                                        </label>
                                        <input
                                            id={"inp3"}
                                            placeholder="Title"
                                            type="text"
                                            value={formData.second_title}
                                        />
                                    </div>
                                    <div className="horz">
                                        <input
                                            id={"inp4"}
                                            placeholder="10px"
                                            type="number"
                                            value={
                                                formData.second_title_size
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <div className="horz">
                                        <label htmlFor="inp5">
                                            Description
                                        </label>

                                        <textarea
                                            name="desc"
                                            id="inp5"
                                            placeholder="Description"
                                            value={formData.description}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <Slider
                                        name="show"
                                        id={1}
                                        initialState={formData.action}
                                    />
                                    <label htmlFor="inp5">Action activer</label>
                                </div>

                                <div className="formgroup">
                                    <div className="horz">
                                        <label htmlFor="inp8">Boutton</label>
                                        <input
                                            name="desc"
                                            id="inp8"
                                            type="text"
                                            placeholder="commander"
                                            value={formData.button}
                                        ></input>
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <div className="horz">
                                        <label htmlFor="inp9">Action</label>
                                        <input
                                            name="desc"
                                            id="inp9"
                                            type="text"
                                            placeholder="lien de l’action"
                                            value={formData.link}
                                        ></input>
                                    </div>
                                </div>
                                <div className="formgroup">
                                    <input
                                        id="sssdada"
                                        type="button"
                                        className="addbuttonssd"
                                        value={"ajouter"}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div style={{ marginTop: "50px" }} id="aodhad12">
                <div className="sjsyw">
                    <h1>Catégories</h1>
                    <div className="sss">
                        <Slider
                            name="activeapropo"
                            id={12}
                            initialState={false}
                        />
                        <p>Caterogy est activé</p>
                    </div>
                </div>

                <div className="categoryContent">
                    {
                        cat &&
                        cat.map((item)=>{
                            let photo = item.photo;
                            if (photo === null){
                                photo = "";
                            }


                            return (
                                <div className="categshow">
                                    <img src={photo} className="categshowphoto"/>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </MainDiv>
    );
}
