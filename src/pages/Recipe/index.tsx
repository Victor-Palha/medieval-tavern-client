import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom"
import { Recipes as TRecipes } from "../../@types/recipes"
import { useEffect, useRef, useState } from "react"
import { api } from "../../config/axios"
import {motion} from "framer-motion"

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
        <div className="bg-gradient-to-b from-1% from-primary  to-secondary">
        <div className="lg:w-[50%] mx-auto ">
            <header className="">
                <nav className="flex justify-between p-4 items-center">
                    <div className="flex gap-3">
                        <button onClick={()=>history.back()}><IoArrowBackCircleOutline size={25}/></button>
                        <h1 className="text-2xl font-bold">{recipe.name}</h1>
                    </div>
                    <button>Save</button>
                </nav>
                <div className="">
                    <img 
                        src={recipe.image} 
                        alt={recipe.name}
                        className="h-[270px] w-full object-cover rounded-3xl px-2"
                    />
                    <p className="px-6 py-4 font-light">{recipe.description}</p>
                </div>
            </header>
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
                                    className="peer-checked:line-through peer-checked:opacity-70 text-lg font-light cursor-pointer"
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
                                className="mt-4 min-w-[400px] bg-white flex rounded-xl p-8 gap-5"
                                key={instruction}
                            >
                                <span className="text-lg font-light">{index + 1}</span>
                                <p className="text-lg font-light">{instruction}</p>
                            </motion.div>
                        ))}
                    </motion.section>
                </motion.section>
            </main>
        </div>
        </div>
    )
}