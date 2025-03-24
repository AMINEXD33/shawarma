import "./style.css";
import addicon from "@/photos/add.svg";


type AddbuttonProps = {
    withIcon: boolean,
    content: string,
    onClickAction: ()=>Promise<void>
}
export default function AddButton({
    withIcon=true,
    content="test button",
    onClickAction

}: AddbuttonProps){




    
    
    return (
        <div 
        onClick={async()=>{
            if (typeof onClickAction === "function"){
                await onClickAction();
            }
        }}
        className="addbtn">
            {withIcon && <img id="addicon" src={addicon}/>}
            {content}
        </div>
    )
}