import { Recipes } from "../../@types/recipes";
import { PiCookingPot , PiHeart, PiTimer} from "react-icons/pi";


export function Cards(item: Recipes){
    return (
        <div 
            className="max-w-[300px] min-w-[300px]
                max-h-[450px] min-h-[450px]
                bg-white rounded-xl
                overflow-hidden shadow-lg
                opacity-90
            "
        >
            <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-[200px] object-cover rounded-t-xl pointer-events-none"
            />
            <div className="p-[12px] flex flex-col gap-2">
                <p
                    className="text-[16px] font-bold"
                >{item.name}</p>
                <p
                    className="text-[14px] font-light border-b-[1px] border-primary"
                >{item.origin}</p>
                <ul>
                    <li className="text-sm">{item.tags.map((tag, index) => (
                        index === item.tags.length - 1 ? tag : tag + ", "
                    ))}
                    </li>
                </ul>
                    <p className="flex items-center gap-2"><PiCookingPot/> Serve {item.serves}</p>
                    <p className="flex items-center gap-2"><PiTimer/>{item.time}</p>
                    <p className="flex items-center gap-2"><PiHeart/> {item.stars}</p>
                    {/* <span className="text-sm">{item.description}</span> */}
            </div>
        </div>
    )
}