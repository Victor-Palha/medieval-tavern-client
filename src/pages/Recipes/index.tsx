import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Search } from "../../Components/Search";
import { Recipes as TRecipe } from "../../@types/recipes";
import { api } from "../../config/axios";
import { List } from "../../Components/List";
import { Loading } from "../../Components/Loading";

export function Recipes(){
    const [list, setList] = useState<TRecipe[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    async function getRecipes(){
        setLoading(true)
        const response = await api.get('/recipes')
        setList(response.data.recipes)
        setLoading(false)
    }

    async function handleRecipesSearch(){
        setLoading(true)
        const response = await api.get(`/recipes/search?q=${search}`)
        setList(response.data.recipes)
        setLoading(false)
    }

    function handleSearch(search: string){
        setSearch(search)
    }

    useEffect(()=>{
        if(search !== ''){
            handleRecipesSearch()
        }else{
            getRecipes()
        }
    }, [search])
    return (
        <main>
            <Header/>
            <Search handleSearch={handleSearch}/>
            <ul className="flex flex-col gap-5 p-2 lg:w-[50%] md:w-[50%] mx-auto">
                {!loading && list.map((recipe) => (
                    <List key={recipe._id} {...recipe}/>
                ))}
                {loading && (
                    <Loading/>
                )}
            </ul>
        </main>
    )
}