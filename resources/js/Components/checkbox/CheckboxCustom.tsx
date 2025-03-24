"./style.css";
interface checkboxTypes{
    name:string,
    id:string
}
export default function CheckBoxCustom({
    name,
    id
}:checkboxTypes){

    return (
        <input className="customCHeckbox" type="checkbox" name={name} id={id}/>
    );
}