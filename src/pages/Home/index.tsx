import { useContext, useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import { Welcome } from "../../components/Welcome";
import { api } from "../../config/axios";
import { Recipes } from "../../@types/recipes";
import { Caroseul } from "../../components/Caroseul";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { NoAuth } from "../../components/NoAuth";
import { LoadingFB } from "../../components/LoadingFB";
import {motion} from "framer-motion"

export function Home(){
    const {auth, userInformation} = useContext(authContext)
    const corouselRef = useRef<null | HTMLDivElement>(null)
    const [width, _setWidth] = useState(0)
    const [recipes, setRecipes] = useState<Recipes[]>([])
    const [isLoading, setIsLoading] = useState(true)

    async function handleRequestRecipes(){
        setIsLoading(true)
        const response = await api.get("/recipes/latests")
        setRecipes(response.data.recipes)
        setIsLoading(false)
    }

    useEffect(()=>{
        handleRequestRecipes()
    }, [])
    return (
        <div>
            <Header/>
            {!auth ? <NoAuth/> : <Welcome name={userInformation.name}/>}
            
            <div className="flex justify-evenly mt-10">
                <p className="text-lg font-bold">Últimas Receitas</p>
                <Link to={"/receitas"} className="font-bold text-primary">Ver todas</Link>
            </div>
            
            {!isLoading && (<Caroseul recipes={recipes} loading={isLoading}/>)}
            {isLoading && (
                <motion.div 
                    ref={corouselRef}
                    whileTap={{cursor: "grabbing"}}
                    className="cursor-grab overflow-hidden p-5"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{left: -width, right: 0}}
                        className="flex gap-3 lg:justify-center items-center"
                    >
                        {[0, 1, 2, 3, 4, 5].map((item)=> (
                            <motion.div key={item}>
                                <LoadingFB type="carousel"/>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
                
            )}
        </div>
    )
}