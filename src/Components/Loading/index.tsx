import { AiOutlineLoading } from "react-icons/ai";

export function Loading(){
    return (
        <div className="w-full items-center flex justify-center">
            <AiOutlineLoading size={50} className="animate-spin"/>
        </div>
    )
}