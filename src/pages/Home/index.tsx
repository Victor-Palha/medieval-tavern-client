import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Welcome } from "../../Components/Welcome";
import { api } from "../../config/axios";
import { Recipes } from "../../@types/recipes";
import { Caroseul } from "../../Components/Caroseul";

export function Home(){
    const [recipes, setRecipes] = useState<Recipes[]>([])
    const [loading, setLoading] = useState(true)

    async function handleRequestRecipes(){
        setLoading(true)
        const response = await api.get("/recipes")
        setRecipes(response.data.recipes)
        setLoading(false)
    }

    useEffect(()=>{
        handleRequestRecipes()
    }, [])
    return (
        <div>
            <Header/>
            <Welcome name="Ash"/>
            <Caroseul recipes={recipes} loading={loading}/>
        </div>
    )
}