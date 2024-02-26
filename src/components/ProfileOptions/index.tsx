import { PiCookingPotFill, PiGearSixFill, PiHeartFill } from "react-icons/pi"
import { Link } from "react-router-dom"

type ProfileOptionsProps = {
    isRecipesSelected: boolean
    setIsRecipesSelected: (value: React.SetStateAction<boolean>) => void
    handleFavoritesRecipes(): Promise<void>
    profileId: string
    userId: string | undefined | null
}
export function ProfileOptions({isRecipesSelected, setIsRecipesSelected, handleFavoritesRecipes, profileId, userId}: ProfileOptionsProps){
    return (
        <div className="mt-5">
            <nav className="flex items-center justify-evenly bg-primary w-[80%] mx-auto p-4 rounded-md shadow">
                <button 
                    className={"flex items-center gap-2 " + (isRecipesSelected ? "border-b-[1px] border-font" : "")}
                    onClick={()=>setIsRecipesSelected(true)}
                >
                    <PiCookingPotFill size={20} className={isRecipesSelected ? "fill-secondary" : ""} /> Receitas
                </button>
                    {profileId === userId ? (
                        <>                        
                            <span className="cursor-default">|</span>
                            <Link to="/profile/edit">
                                <PiGearSixFill size={20} className="hover:animate-gear-rotate cursor-pointer"/>
                            </Link>
                            <span className="cursor-default">|</span>
                        </>
                    ) : (
                        <span className="cursor-default">|</span>
                    )}
                <button 
                    className={"flex items-center gap-2 " + (!isRecipesSelected ? "border-b-[1px] border-font" : "")}
                    onClick={()=>{
                        setIsRecipesSelected(false)
                        handleFavoritesRecipes()
                    }}  
                >
                    <PiHeartFill size={20} className={!isRecipesSelected ? "fill-secondary" : ""}/>Favoritos
                </button>
            </nav>
        </div>
    )
}