import React from "react";
import { Container } from "react-bootstrap";


type mainDivProps = {
    title?:string,
    subtitle?: string,
    children?: React.ReactNode
}


export default function MainDiv({
    title="",
    subtitle="",
    children
}:mainDivProps){




    return (
        <Container fluid>
            <div
            style={{display:"flex", flexDirection:"column", gap:"10px"}} 
            className="containerTitles">
                { title !== "" && <h1>{title}</h1>}
                { subtitle !== "" && <p>{subtitle}</p>}
            </div>

            {children}
        </Container>
    )
}