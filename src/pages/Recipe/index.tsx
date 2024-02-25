import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom"
import { Recipes as TRecipes } from "../../@types/recipes"
import { useEffect, useRef, useState } from "react"
import { api } from "../../config/axios"
import {motion} from "framer-motion"
import { PiHeartFill } from "react-icons/pi";

export function Recipe(){
    const {id} = useParams<string>() 
    const [recipe, setRecipe] = useState<TRecipes>({} as TRecipes)
    const [loading, setLoading] = useState(true)
    const corouselRef = useRef<null | HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    async function getRecipe(id: string){
        setLoading(true)
        const response = await api.get(`/recipes/${id}`)
        setRecipe(response.data.recipe)
        setLoading(false)
    }

    useEffect(()=>{
        loading && id && getRecipe(id)
        if(corouselRef.current && !loading){
            setWidth(corouselRef.current?.scrollWidth - corouselRef.current?.offsetWidth)
        }
    }, [loading])

    return (
        !loading && 
        <div className="bg-gradient-to-b from-0.5% from-primary  to-secondary">
        <div className="lg:w-[50%] mx-auto">
            <header>
                <nav className="flex justify-between p-4 items-center">
                    <div className="flex gap-3">
                        <button onClick={()=>history.back()}><IoArrowBackCircleOutline size={25}/></button>
                        <h1 className="text-2xl font-bold">{recipe.name}</h1>
                    </div>
                    <button className="flex items-center gap-1 group">
                        <PiHeartFill size={30} className="group-hover:fill-red-500 group-hover:scale-110 transition "/>
                        {recipe.stars}
                    </button>
                </nav>
                <div>
                    <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className="h-[270px] w-full object-cover rounded-3xl px-2"
                    />
                    <Link to={`/profile/${recipe.createdBy._id}/${recipe.createdBy.name}`} className="w-full flex justify-center items-center flex-col">
                        <img 
                            src={recipe.createdBy.image} 
                            alt={`foto de perfil de ${recipe.createdBy.name}`}
                            className="w-24 h-24 rounded-full object-cover border-2 border-font top-[-50px] relative animate-bounce-small shadow-2xl"
                        />
                        <h2 className="text-lg font-bold top-[-50px] relative">Criado por {recipe.createdBy.name}</h2>
                    </Link>
                    <p className="px-6 py-4 font-light">{recipe.description}</p>
                </div>
            </header>
            <div className="bg-white p-6 rounded-3xl m-6">
                <h2 className="font-bold text-xl md:text-center">Informações</h2>
                <div className="mt-4 flex gap-4 md:flex md:justify-evenly">
                    <div>
                        <h3 className="font-bold text-sm md:text-base">Tempo de preparo</h3>
                        <p>{recipe.time}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm md:text-base">Rendimento</h3>
                        <p>{recipe.serves}</p>
                    </div>
                </div>
            </div>
            <main className="">
                <section className="p-6">
                    <h2 className="font-bold text-xl">Ingredientes</h2>
                    <div className="mt-4 bg-white flex flex-col rounded-xl p-8 gap-5">
                        {recipe.ingredients.map((ingredient) => (
                            <label className="flex gap-2 items-center" key={ingredient}>
                                <input 
                                    type="checkbox"
                                    id={ingredient}
                                    className="peer w-4 h-4 rounded-md"
                                />
                                <span 
                                    className="peer-checked:line-through peer-checked:opacity-70 font-light cursor-pointer text-sm md:text-base"
                                >
                                    {ingredient}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <motion.section 
                    ref={corouselRef}
                    whileTap={{cursor: "grabbing"}}
                    className="cursor-grab overflow-hidden p-5"
                >
                    <h2 className="font-bold text-xl">Instruções</h2>
                    <motion.section
                        drag="x"
                        dragConstraints={{left: -width, right: 0}}
                        className="flex gap-3"
                    >
                        {recipe.instructions.map((instruction, index) => (
                            <motion.div
                                className="mt-4 min-w-[300px] bg-white flex rounded-xl p-5 gap-5"
                                key={instruction}
                            >
                                <span className="text-lg font-light">{index + 1}</span>
                                <p className="text-sm md:text-base font-light">{instruction}</p>
                            </motion.div>
                        ))}
                    </motion.section>
                </motion.section>
            </main>
        </div>
        </div>
    )
}