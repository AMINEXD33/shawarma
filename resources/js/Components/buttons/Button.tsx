import "./style.css";
interface ButtonCustomProps{
    type: "button"|"reset"|"submit",
    text: string,
    onClick: ()=>void,
    style?:{[key:string]:string}
}
export default function ButtonCustom({type, text, onClick, style={}}: ButtonCustomProps){

    return (
        <button
        style={style}
        onClick={()=>{onClick()}}
        type={type}
        className="customButton"
        >{text}</button>
    )
}