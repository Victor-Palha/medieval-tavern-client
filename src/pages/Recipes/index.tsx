import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Search } from "../../Components/Search";
import { Recipes as TRecipe } from "../../@types/recipes";
import { api } from "../../config/axios";
import { List } from "../../Components/List";

export function Recipes(){
    const [list, setList] = useState<TRecipe[]>([])
    const [search, setSearch] = useState('')

    async function getRecipes(){
        const response = await api.get('/recipes')
        setList(response.data.recipes)
    }

    async function handleRecipesSearch(){
        const response = await api.get(`/recipes/search?q=${search}`)
        setList(response.data.recipes)
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
            <ul className="flex flex-col gap-5 p-2">
                {list.map((recipe) => (
                    <List key={recipe._id} {...recipe}/>
                ))}
            </ul>
        </main>
    )
}