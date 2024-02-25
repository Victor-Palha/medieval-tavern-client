import { AiOutlineLoading } from "react-icons/ai";

type LoadingProps = {
    size?: number;
}

export function Loading({size = 50}: LoadingProps){
    return (
        <div className="w-full items-center flex justify-center">
            <AiOutlineLoading size={size} className="animate-spin"/>
        </div>
    )
}