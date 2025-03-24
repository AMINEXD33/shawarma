import "./style.css";
import x from "@/photos/x.svg";
import CustomFetch from "@/customFetch";
import { MutableRefObject, useRef } from "react";
import { useDispatch } from "react-redux";
import { ERROR, SUCCESS } from "@/redux/alerts/reducers";
type IngredShipsProps = {
    ingredId: number;
    productId: number;
    title: string;
    className: string;
    onClickRoutine: (
        productId: number,
        ingredId: number,
        ship: MutableRefObject<HTMLDivElement | undefined>
    ) => Promise<void>;
};

export default function IngredShip({
    className,
    ingredId,
    productId,
    title,
    onClickRoutine,
}: IngredShipsProps) {
    const ship = useRef<HTMLDivElement>();
    const dispatcher = useDispatch();
    const removeingred = async () => {
        const response = await CustomFetch(
            route("removeIngred"),
            "POST",
            JSON.stringify({
                ingredId: ingredId,
                productId: productId,
            })
        );
        if (response.code === "data") {
            dispatcher(SUCCESS("deleted"));
            return true;
        }
        dispatcher(ERROR("deleted"));
        return false;
    };

    return (
        <div className={className} ref={ship}>
            {title}
            <img
                onClick={async () => {
                    if (typeof onClickRoutine === "function") {
                        const flag = await removeingred();
                        if (flag) {
                            onClickRoutine(productId, ingredId, ship);
                        }
                    } else {
                        throw new Error("onClickRoutine is not a function");
                    }
                }}
                src={x}
                style={{ height: 10, width: 10, cursor: "pointer" }}
            />
        </div>
    );
}
