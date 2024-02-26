import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom"
import { Recipes as TRecipes } from "../../@types/recipes"
import { useContext, useEffect, useRef, useState } from "react"
import { api } from "../../config/axios"
import {motion} from "framer-motion"
import { PiHeartFill, PiTrashThin } from "react-icons/pi";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export function Recipe(){
    const {id} = useParams<string>()
    const [isFavorite, setIsFavorite] = useState(false)
    const [isMyRecipe, setIsMyRecipe] = useState(false)
    const {auth, userInformation, checkAuth} = useContext(authContext)
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

    async function handleGiveStar(){
        if(!auth || !id) {
            toast.warning("Você precisa estar logado para favoritar uma receita"!)
        }
        else{
            try {
                await api.patch(`/recipes/star/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("@mt:client")}`
                    }
                })
                setIsFavorite(!isFavorite)
                await checkAuth()
            } catch (error) {
                toast.error("Erro ao favoritar a receita")
            }
        }
    }

    async function handleDeleteRecipe(){
        if(!id) return;
        const confirm = window.confirm("Você tem certeza que deseja deletar essa receita?")
        if(!confirm) return;
        try {
            await api.delete(`/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("@mt:client")}`
                }
            })
            toast.success("Receita deletada com sucesso")
            window.location.href = "/"
        } catch (error) {
            toast.error("Erro ao deletar receita")
        }
    }

    useEffect(()=>{
        loading && id && getRecipe(id)
        if(corouselRef.current && !loading && userInformation.myFavorites){
            setWidth(corouselRef.current.scrollWidth - corouselRef.current.offsetWidth)
            if(userInformation._id === recipe.createdBy._id){
                setIsMyRecipe(true)
            }
            const favoriteRecipes = userInformation.myFavorites.filter(favorite => favorite === id)
            if(favoriteRecipes.length > 0){
                setIsFavorite(true)
            }
        }
    }, [loading, userInformation, corouselRef])

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
                    {isMyRecipe ? (
                        <button className="flex items-center gap-1 group" onClick={()=>handleDeleteRecipe()}>
                            <PiTrashThin size={30} className="group-hover:fill-red-500 group-hover:scale-110 transition "/>
                        </button>
                    ) : (
                        <button className="flex items-center gap-1 group" onClick={()=>handleGiveStar()}>
                            <PiHeartFill size={30} className={isFavorite ? "fill-red-500" : "group-hover:fill-red-500 group-hover:scale-110 transition "}/>
                        </button>
                    )}
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
                        <h2 className="text-lg font-bold top-[-50px] relative">Postado por {recipe.createdBy.name}</h2>
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