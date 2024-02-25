import { PiHeart } from "react-icons/pi";
import { Recipes } from "../../@types/recipes";
import { Link } from "react-router-dom";

export function List(recipe: Recipes){
    return (
        <Link to={`/receita/${recipe._id}`} className="flex max-h-[300px] overflow-hidden w-full gap-3  cursor-pointer">
            <div>
                <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="h-[150px] w-[180px] max-h-[150px] max-w-[180px] rounded-lg 
                    hover:scale-110 
                    hover:translate-x-3
                    hover:translate-y-3
                    hover:shadow-2xl
                    transition duration-300"
                />
            </div>
            <div className="flex flex-col overflow-hidden max-h-[200px] gap-2 group">
                <p 
                className="text-md font-bold border-b-[1px] border-secondary transition duration-300 group-hover:border-primary">
                    {recipe.name}
                </p>
                <div className="flex gap-2">
                    <span className="flex text-sm items-center gap-1"><PiHeart/> {recipe.stars}</span>
                    <span className="flex text-sm items-center">Serve até {recipe.serves}</span>
                </div>
                <ul>
                    <li className="text-[12px] font-light">{recipe.tags.map((tag, index) => (
                        index === recipe.tags.length - 1 ? tag : tag + ", "
                    ))}
                    </li>
                </ul>
                <p className="text-[10px] md:text-sm font-light">{recipe.description}</p>
            </div>
        </Link>
    )
}