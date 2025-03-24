import React, { ReactChildren, useCallback, useRef, useState } from "react";

import { PageProps } from "@/types";
import { Alert, Container } from "react-bootstrap";
import burger from "@/photos/burger.svg";
import settings from "@/photos/settings.svg";
import notif from "@/photos/notification.svg";
import logo from "./logo.png";
import products from "@/photos/products.svg";
import prod_light from "@/photos/prod_light.svg";
import prod_dark from "@/photos/prod_dark.svg";
import category_light from "@/photos/categ_light.svg";
import category_dark from "@/photos/categ_dark.svg";
import promo_dark from "@/photos/promos_dark.svg";
import promo_light from "@/photos/promos_light.svg";
import ingred_light from "@/photos/ingred_light.svg";
import ingred_dark from "@/photos/ingred_dark.svg";
import ManageProducts from "./manageProducts/page";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ERROR, SUCCESS } from "@/redux/alerts/reducers";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "./layout.css";
import AddProduct from "./addProducts/page";
import EditProduct from "./editProduct/page";
import ManageIngred from "./manageIngred/page";
import EditIngred from "./editIngreds/page";
import ManageCats from "./manageCategory/page";
import AddCategory from "./addCategory/page";
import EditCategory from "./editCategory/page";

type propsType = PageProps<{
    targetPage: number;
    children: typeof React.Children;
    data: any[];
}>;



export default function MainLayout({ targetPage = 1 , data}: propsType) {
    const [page, setPage] = useState(targetPage);
    const [fullView, setFullView] = useState(true);
    const leftCont = useRef<HTMLDivElement>(null);
    const alerts = useSelector((state: RootState)=>state.alerts);
    const [showAlert, setShow] = useState(true);
    const toggleleft = useCallback(() => {
        if (!leftCont.current) {
            return;
        }
        if (fullView === true) {
            leftCont.current.classList.remove("active");
            leftCont.current.classList.add("unactive");
        } else {
            leftCont.current.classList.remove("unactive");
            leftCont.current.classList.add("active");
        }
        setFullView(!fullView);
    }, [fullView]);


    const ErrorAlert = useCallback(()=>{
        return (
            <Alert className="alerts" variant={alerts.type==="success"?"success":"danger"}onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{alerts.type}</Alert.Heading>
            <p>
              {alerts.msg}
            </p>
          </Alert>
        )
    }, [alerts]);


    return (
        <Container className="mainCont" fluid>
            {
                alerts.type !== "null"&&
                <ErrorAlert/>
            }
            <div className="rightContainer">
                <div className="navbar">
                    <div className="navRight">
                        <img src={logo} id="logonav" />
                        <img src={settings} id="settnav" />
                        <img src={notif} id="notifnav" />
                    </div>
                    <div className="navLeft">
                        <img
                            onClick={() => {
                                toggleleft();
                            }}
                            src={burger}
                            id="burgnav"
                        />
                    </div>
                </div>
                <Container fluid>
                    <Container className="content" fluid="xxl">
                            {targetPage==1 && <ManageProducts/>}
                            {targetPage==2 && <ManageCats/>}
                            {targetPage==3 && <ManageIngred/>}
                            {targetPage==4 && <div>this is the forth page</div>}
                            {targetPage==5 && <AddProduct/>}
                            {targetPage==6 && <EditProduct data={data}/>}
                            {targetPage==7 && <EditIngred data={data}/>}
                            {targetPage==8 && <AddCategory/>}
                            {targetPage==9 && <EditCategory data={data}/>}
                    </Container>
                </Container>
            </div>
            <div className="leftContainer" ref={leftCont}>
                {!fullView ? (
                    <div className="activeleft sameleft">
                        <div className="group">
                            <img src={logo} id="logoleft" />
                        </div>
                        <div className="group" id="group2">
                            <div 
                            onClick={()=>{location.assign(route("manageProducts"))}}
                            className={targetPage==1?"linkCOntainer fulllink":"fulllink"}>
                            <img src={targetPage==1?prod_light:prod_dark} id="settnav" />
                            </div>
                            <div
                            onClick={()=>{location.assign("/manageCategory")}} 
                            className={targetPage==2?"linkCOntainer fulllink":"fulllink"}>
                            <img src={targetPage==2?category_light: category_dark} id="settnav" />
                            </div>
                            <div
                            onClick={()=>{location.assign("/manageIngredient")}} 
                            className={targetPage==3?"linkCOntainer fulllink":"fulllink"}>
                            <img src={targetPage==3?ingred_light: ingred_dark} id="settnav" />
                            </div>
                            <div
                            onClick={()=>{location.assign("/managePromos")}} 
                            className={targetPage==4?"linkCOntainer fulllink":"fulllink"}>
                            <img src={targetPage==4?promo_light:promo_dark} id="notifnav" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="activeleft sameleft">
                        <div className="group">
                            <img src={logo} id="logoleft" />
                        </div>
                        <div className="group" id="group2">
                            <div 
                                onClick={()=>{location.assign(route("manageProducts"))}}
                            className={targetPage==1?"linkCOntainer fulllink":"fulllink"}>
                                <img src={targetPage==1?prod_light:prod_dark} id="settnav" />
                                <p>Gestion des produits </p>
                            </div>
                            <div
                                onClick={()=>{location.assign("/manageCategory")}} 
                            className={targetPage==2?"linkCOntainer fulllink":"fulllink"}>
                                <img src={targetPage==2?category_light: category_dark} id="settnav" />
                                <p>Gestion des catégories</p>
                            </div>
                            <div
                            onClick={()=>{location.assign("/manageIngredient")}} 
                            className={targetPage==3?"linkCOntainer fulllink":"fulllink"}>
                                <img src={targetPage==3?ingred_light: ingred_dark} id="settnav" />
                                <p>Gestion des ingrédients</p>
                            </div>
                            <div
                            onClick={()=>{location.assign("/managePromos")}} 
                            className={targetPage==4?"linkCOntainer fulllink":"fulllink"}>
                                <img src={targetPage==4?promo_light:promo_dark} id="notifnav" />
                                <p>Gestion des catégories </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}
