import MainDiv from "@/Components/mainDiv";
import "./style.css";

import CustomFetch from "@/customFetch";
import img from "@/photos/things.svg";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import editIcon from "@/photos/editss.svg";
import FormINput from "@/Components/formInputs/input";
import Slider from "@/Components/sliderbutton/slider";
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
export default function ManageSlides() {
    const [modificationTarget, setModificationTarget] = useState<number | null>(
        null
    );
    const [slides, setSlides] = useState<slide[]>([
        {
            id: 0,
            title: "asdsa",
            description: "asfasfhoasoasfoiashfiasf",
            title_size: 10,
            second_title: "fokajfoa",
            second_title_size: 12,
            action: false,
            button: "adpojada",
            link: "aspohafhiapf",
            photo: null,
        },
        {
            id: 0,
            title: "asdsa",
            description: "asfasfhoasoasfoiashfiasf",
            title_size: 10,
            second_title: "fokajfoa",
            second_title_size: 12,
            action: true,
            button: "adpojada",
            link: "aspohafhiapf",
            photo: null,
        },
        {
            id: 2,
            title: "asdsa",
            description: "asfasfhoasoasfoiashfiasf",
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
        console.log(modificationTarget);
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
                {modificationTarget && (
                    <>
                        <h1>APROPOS</h1>
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
                                    <label htmlFor="inp1">Titre</label>
                                    <input
                                        id="inp1"
                                        placeholder="Title"
                                        type="text"
                                    />
                                <div className="horz">
                                <label htmlFor="inp2">
                                        Sous-titre (Fr)
                                    </label>
                                    <input
                                        id="inp2"
                                        placeholder="10px"
                                        type="number"
                                    />
                                </div>
                                </div>

                                <div className="formgroup">
                                    <input
                                        id={"inp3"}
                                        placeholder="Title"
                                        type="text"
                                    />
                                    <input
                                        id={"inp4"}
                                        placeholder="10px"
                                        type="number"
                                    />
                                </div>

                                <div className="formgroup">
                                    <div className="horz">
                                    <label htmlFor="inp5">Description</label>

<textarea
    name="desc"
    id="inp5"
    placeholder="Description"
></textarea>
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <Slider
                                        name="show"
                                        id={1}
                                        initialState={false}
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
                                        placeholder="Description"
                                    ></input>
                                    </div>
                                </div>

                                <div className="formgroup">
                                    <label htmlFor="inp9">Action</label>
                                    <div className="horz">
                                        <input
                                            name="desc"
                                            id="inp9"
                                            type="text"
                                            placeholder="Description"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainDiv>
    );
}
