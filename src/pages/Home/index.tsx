import { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Welcome } from "../../Components/Welcome";
import { api } from "../../config/axios";
import { Recipes } from "../../@types/recipes";
import { Caroseul } from "../../Components/Caroseul";
import { Link } from "react-router-dom";
import { Loading } from "../../Components/Loading";
import { authContext } from "../../context/AuthContext";
import { NoAuth } from "../../Components/NoAuth";

export function Home(){
    const {auth, userInformation} = useContext(authContext)
    const [recipes, setRecipes] = useState<Recipes[]>([])
    const [loading, setLoading] = useState(true)

    async function handleRequestRecipes(){
        setLoading(true)
        const response = await api.get("/recipes/latests")
        setRecipes(response.data.recipes)
        setLoading(false)
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
            {!loading && (<Caroseul recipes={recipes} loading={loading}/>)}
            {loading && (
                <Loading/>
            )}
        </div>
    )
}