import "./style.css";

interface LinkCustomProps{
    text: string,
    href: string
}
export default function LinkCustom ({
    text, 
    href
}: LinkCustomProps){



    return (
        <a className="cusomlink" href={href}>{text}</a>
    )
}