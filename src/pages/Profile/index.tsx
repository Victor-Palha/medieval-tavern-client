import { useParams } from "react-router-dom"
import { Header } from "../../components/Header"
import { api } from "../../config/axios"
import { useContext, useEffect, useState } from "react"
import { Recipes } from "../../@types/recipes"
import { TbFileSad } from "react-icons/tb";
import { List } from "../../components/List"
import { LoadingFB } from "../../components/LoadingFB"
import { ProfileOptions } from "../../components/ProfileOptions"
import { authContext } from "../../context/AuthContext"

type UserProfile = {
    name: string;
    description: string;
    image: string;
    amount_of_recipes: number;
    _id: string;
    myRecipes: Recipes[];
}


export function Profile(){
    const {userInformation} = useContext(authContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingFavorites, setIsLoadingFavorites] = useState(true)
    const [isRecipesSelected, setIsRecipesSelected] = useState(true)
    const [favoritesRecipes, setFavoritesRecipes] = useState<Recipes[]>([] as Recipes[])
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile)
    const {id} =  useParams()

    async function handleFavoritesRecipes(){
        setIsLoadingFavorites(true)
        const response = await api.get(`/recipes/favorite/${id}`)
        setFavoritesRecipes(response.data.recipes)
        setIsLoadingFavorites(false)
    }

    async function handleUserProfile(id:string){
        setIsLoading(true)
        const response = await api.get(`/profile/${id}`)
        setUserProfile(response.data.profile)
        setIsLoading(false)
    }

    useEffect(()=>{
        id && handleUserProfile(id)
    }, [id])

    return (
        <> 
            <main>
                <Header/>
                {!isLoading && (<div className="flex flex-col justify-center items-center">
                    <img 
                        src={userProfile.image} 
                        alt={userProfile.name}
                        className="w-40 h-40 rounded-full object-cover border-[2px] border-font shadow-md pointer-events-none top-[-25px] relative animate-bounce-small shadow-2x"
                    />
                    <h1 className="text-2xl font-bold">{userProfile.name.split(" ")[0]}</h1>
                    <p className="mt-2 italic w-[80%]">{userProfile.description}</p>
                </div>)}

                <ProfileOptions 
                    isRecipesSelected={isRecipesSelected} 
                    setIsRecipesSelected={setIsRecipesSelected}
                    handleFavoritesRecipes={handleFavoritesRecipes}
                    profileId={userProfile._id}
                    userId={userInformation._id}
                />

                {isRecipesSelected && !isLoading && (
                    <div className="flex flex-col gap-5 p-2 lg:w-[50%] md:w-[50%] mx-auto mt-5">
                        {userProfile.myRecipes.length > 0 ? userProfile.myRecipes.map(recipe => (
                            <List key={recipe._id} {...recipe}/>
                        )) : (
                            <div className="flex justify-center flex-col items-center mt-5">
                                <p className="text-xl font-bold">Nenhuma receita encontrada</p>
                                <TbFileSad size={40} className="ml-2"/>
                            </div>
                        )}
                    </div>
                )}
                {!isRecipesSelected && !isLoadingFavorites && (
                    <div className="flex flex-col gap-5 p-2 lg:w-[50%] md:w-[50%] mx-auto mt-5">
                        {favoritesRecipes.length > 0 ? favoritesRecipes.map(recipe => (
                            <List key={recipe._id} {...recipe}/>
                        )) : (
                            <div className="flex justify-center flex-col items-center mt-5">
                                <p className="text-xl font-bold">Nenhuma receita favoritada</p>
                                <TbFileSad size={40} className="ml-2"/>
                            </div>
                        )}
                    </div>
                )}
                {isRecipesSelected && isLoading && (
                    <div className="flex flex-col gap-5 p-2 lg:w-[50%] md:w-[50%] mx-auto mt-5">
                        {[1,2,3,4,5,6,7,8,9,10].map((item) => (
                            <LoadingFB key={item} type="list"/>
                        ))}
                    </div>
                )}
                {!isRecipesSelected && isLoadingFavorites && (
                    <div className="flex flex-col gap-5 p-2 lg:w-[50%] md:w-[50%] mx-auto mt-5">
                        {[1,2,3,4,5,6,7,8,9,10].map((item) => (
                            <LoadingFB key={item} type="list"/>
                        ))}
                    </div>
                )}
                
            </main>
        </>
    )
}