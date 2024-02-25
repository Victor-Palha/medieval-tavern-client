import { useState } from "react";
import { CiSearch } from "react-icons/ci";

type SearchProps = {
    handleSearch(search: string): void
}
export function Search({handleSearch}: SearchProps){

    const [search, setSearch] = useState('')

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        handleSearch(search)
    }

    return (
        <form className="flex justify-center  m-5" onSubmit={(e)=>handleSubmitSearch(e)}>
            <div className="flex items-center gap-2">
                <input 
                    type="search" 
                    placeholder="Pesquise por uma receita" 
                    className="w-full p-2 border-[1px] border-primary rounded-lg focus:outline-none focus:shadow-lg transition-all duration-300 ease-in-out"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="bg-primary p-2 rounded-lg text-white"
                >
                    <CiSearch size={20}/>
                </button>
            </div>
        </form>
    )
}