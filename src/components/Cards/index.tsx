import { useNavigate } from "react-router-dom";
import { Recipes } from "../../@types/recipes";
import { PiCookingPot , PiHeart, PiTimer} from "react-icons/pi";


export function Cards(item: Recipes){
    const navigate = useNavigate()
    return (
        <div 

            className="max-w-[300px] min-w-[300px]
                max-h-[450px] min-h-[500px]
                bg-white rounded-xl
                overflow-hidden shadow-lg
                opacity-90
                flex flex-col
                justify-between
            "
        >
            <>
                <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-t-xl pointer-events-none"
                />
                <div className="p-[12px] flex flex-col items-start h-full cursor-pointer" onClick={()=>navigate(`/receita/${item._id}`)}>
                    <div className="flex flex-col gap-2">
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
                    </div>
                </div>
            </>
            <div className="p-[12px] items-center gap-2 flex border-t-[2px] border-secondary">
                <img 
                    src={item.createdBy.image}
                    className="w-12 h-12 rounded-full object-cover border-[2px] border-font shadow-md pointer-events-none"
                />
                <p className="text-[14px] italic">Receita publicada por {item.createdBy.name.split(" ")[0]}</p>
            </div>
        </div>
    )
}