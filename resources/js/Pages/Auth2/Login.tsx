import { Container, Form } from "react-bootstrap";
import "./style.css";
import ButtonCustom from "@/Components/buttons/Button";
import InputCustom from "@/Components/inputs/Input";
import { useEffect, useState } from "react";
import x from "./X.svg";
import logo from "../logo.png";
import CheckBoxCustom from "@/Components/checkbox/CheckboxCustom";
import LinkCustom from "@/Components/link/LinkCustom";
export default function Login() {
    const [error, setError] = useState("asdsa");
    const [formData, setFormData] = useState<{[key:string|number]:any}>({});

    const logIn = async ()=>{
        // pack
        const form = new FormData();
        for( let key of Object.keys(formData)){
            form.set(key, formData?.[key]);
        }
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');


        const header = await fetch(route("customlogin"), {
            method: "POST",
            headers:{
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
            },
            body: form
        })
        if (header.ok){
            location.replace(route("manageProducts"));
            return;
        }
        setError("wrong email or password");
    

    }

    useEffect(()=>{
        console.log(formData);
    })


    return (
        <Container fluid className="containerCentrlize">
            <form className="LoginForm">
                <img className="logofix" src={logo} style={{ width: "100px", height: "100px" }} />
                {error !== "" && error &&

                    <div className="smallerror">
                        <img src={x} style={{ width: "30px", height: "30px" }} />
                        <p>{error}</p>
                        <img
                            onClick={() => { setError("") }}
                            src={x} style={{ width: "10px", height: "10px" }} />
                    </div>
                }

                <InputCustom
                formData={formData}
                setFormData={setFormData}
                type="text" name="email" placeholder="Login" id="email" />
                <InputCustom
                formData={formData}
                setFormData={setFormData}
                type="password" name="password" placeholder="Login" id="password" />
                <div style={{ display: "flex", justifyContent: "space-between", width:"500px" }}>
                    <div style={{ display: "flex", gap:"5px", alignItems:"center", justifyContent:'center'}}>
                        <CheckBoxCustom name="rememberme" id="remem" />
                        <label>Rester connecté(e)</label>
                    </div>
                    <LinkCustom text="Mot de passe oublié?" href={"/"}/>
                </div>

                <ButtonCustom 
                onClick={()=>{
                    logIn();
                }}
                text="CONNEXTION" type="button" />
            </form>

        </Container>
    )
}