import { KeyboardEvent, useCallback, useContext, useState } from "react"
import { authContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useDropzone } from "react-dropzone"
import { PiBookOpenTextLight, PiCookingPot, PiPlusCircle } from "react-icons/pi"
import { Loading } from "../../components/Loading"
import { CgClose } from "react-icons/cg"
import { api } from "../../config/axios"
import { toast } from "react-toastify"

export function NewRecipe(){
    const navigate = useNavigate()
    const {auth} = useContext(authContext)
    // image
    const [selectFileUrl, setSelectFileUrl] = useState<string>("");
    const [selectFile, setSelectFile] = useState<File>();
    // form
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [origin, setOrigin] = useState<string>("");
    const [tagValue, setTagValue] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [serves, setServes] = useState<string>("1");
    const [time, setTime] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [ingredientsValue, setIngredientsValue] = useState<string>("");
    const [instructions, setInstructions] = useState<string[]>([]);
    const [instructionsValue, setInstructionsValue] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        
        const fileUrl = URL.createObjectURL(file)

        setSelectFileUrl(fileUrl)
        setSelectFile(file)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: {accept: ["image/*"]}})

    /* Form Functions */
    function handleAddTagKeyDown(e: KeyboardEvent<HTMLInputElement>){
        if(e.key === "Tab"){
            handleAddTag()
        }
    }
    function handleAddTag(){
        if(tagValue.trim() === "") return
        const newTag = tagValue.trim().toLocaleUpperCase().split(" ")
        setTags([...tags, ...newTag])
        setTagValue("")
    }
    function handleAddIngredientsKeyDown(e: KeyboardEvent<HTMLInputElement>){
        if(e.key === "Tab"){
            handleAddIngredients()
        }
    }
    function handleAddIngredients(){
        if(ingredientsValue.trim() === "") return
        const newIngredients = ingredientsValue.trim().toLocaleUpperCase()
        setIngredients([...ingredients, newIngredients])
        setIngredientsValue("")
    }

    function handleAddInstruction(){
        if(instructionsValue.trim() === "") return
        const newInstruction = instructionsValue.trim()
        setInstructions([...instructions, newInstruction])
        setInstructionsValue("")
    }

    async function handleUploadImage(): Promise<string | undefined>{
        if(!selectFile){
            toast.error("Selecione uma imagem")
            return;
        }
        const data = new FormData()
        data.append("file", selectFile)

        try {
            
            const response = await api.post("/recipes/image", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("@mt:client")}`
                }
            })

            setSelectFileUrl("")
            setSelectFile(undefined)
            return response.data.url
        } catch (error) {
            throw new Error("Erro ao fazer upload da imagem")
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(!name || !description || !origin || !tags || !serves || !time || !ingredients || !instructions){
            toast.error("Preencha todos os campos")
            return
        }
        try {
            setIsLoading(true)
            const url = await handleUploadImage()
            if(!url) return
            const data = {
                name,
                description,
                origin,
                tags,
                serves: Number(serves),
                time,
                ingredients,
                instructions,
                image: url
            }
            console.log(data)

            await api.post("/recipes", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("@mt:client")}`
                }
            })

            toast.success("Receita criada com sucesso")
        } catch (error) {
            toast.error("Erro ao criar receita")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {!auth && navigate("/login")}
            <header className="bg-primary">
                <nav className="flex justify-between p-4 items-center">
                    <div className="flex gap-3">
                        <button onClick={()=>history.back()}><IoArrowBackCircleOutline size={25}/></button>
                        <h1 className="text-2xl font-bold">Criar nova receita</h1>
                    </div>
                </nav>
            </header>
                <form onSubmit={(e)=>handleSubmit(e)} className="mb-10">
                    <div className="flex items-center mx-auto mt-10 justify-center w-[80%]" {...getRootProps()}>
                        {selectFileUrl ? (
                            <div className="text-center">
                                <img src={selectFileUrl} className="opacity-80 rounded-sm shadow-lg cursor-pointer hover:scale-105 transition"/>
                            </div>
                        ) : (
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mx-auto">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para o upload</span> ou arraste e solte</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG ou JPG</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
                            </label>
                        )}
                    </div>
                    <div className="flex mx-auto mt-5 flex-col gap-2 w-[300px] md:w-[500px]">
                        <p className="font-light italic">Nome da receita</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <PiCookingPot className="text-primary" size={25}/>
                            <input 
                                type="text" 
                                className="focus:outline-none w-[80%]" 
                                placeholder="Nome"
                                min={3}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <p className="font-light italic">Origem</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <PiCookingPot className="text-primary" size={25}/>
                            <input 
                                type="text" 
                                className="focus:outline-none w-[80%]" 
                                placeholder="Origem"
                                min={3}
                                required
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                            />
                        </div>

                        <p className="font-light italic">Tags</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <input 
                                type="text" 
                                className="focus:outline-none w-[90%]" 
                                placeholder="Tags"
                                value={tagValue}
                                onChange={(e) => setTagValue(e.target.value)}
                                onKeyDown={handleAddTagKeyDown}
                            />
                            <button type="button"  onClick={handleAddTag}>
                                <PiPlusCircle size={20}/>
                            </button>
                        </div>
                        {tags.length > 0 && tags.map((tag, index)=>(
                            <div className="p-2 rounded-md border-b-[1px] border-primary flex justify-between mb-5">
                                <span key={index} className="">{tag}</span>
                                <CgClose 
                                    size={20} 
                                    onClick={()=>setTags(tags.filter((_, i) => i !== index))}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}

                        <p className="font-light italic">Essa receita serve até quantas pessoas?</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <PiCookingPot className="text-primary" size={25}/>
                            <input 
                                type="number" 
                                className="focus:outline-none w-[80%]" 
                                placeholder="Serve até"
                                min={1}
                                required
                                value={serves}
                                onChange={(e) => setServes(e.target.value)}
                            />
                        </div>

                        <p className="font-light italic">Tempo de preparo</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <PiCookingPot className="text-primary" size={25}/>
                            <input 
                                type="text" 
                                className="focus:outline-none w-[80%]" 
                                placeholder="1 hora"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <p className="font-light italic">Ingredientes</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <input 
                                type="text" 
                                className="focus:outline-none w-[90%]" 
                                placeholder="Ingredientes"
                                value={ingredientsValue}
                                onChange={(e) => setIngredientsValue(e.target.value)}
                                onKeyDown={handleAddIngredientsKeyDown}
                            />
                            <button type="button"  onClick={handleAddIngredients}>
                                <PiPlusCircle size={20}/>
                            </button>
                        </div>
                        {ingredients.length > 0 && ingredients.map((ingredient, index)=>(
                            <div className="p-2 rounded-md border-b-[1px] border-primary flex justify-between mb-5">
                                <span key={index} className="">{ingredient}</span>
                                <CgClose 
                                    size={20} 
                                    onClick={()=>setIngredients(ingredients.filter((_, i) => i !== index))}
                                    className="cursor-pointer"
                                />
                            </div>
                        ))}

                        <p className="font-light italic">Adicione as instruções</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <textarea 
                                className="focus:outline-none w-[90%] min-w-[90%] max-w-[90%] min-h-[150px] max-h-[150px] text-sm italic" 
                                placeholder="Instruções"
                                value={instructionsValue}
                                onChange={(e) => setInstructionsValue(e.target.value)}
                            />
                            <button type="button"  onClick={handleAddInstruction}>
                                <PiPlusCircle size={20}/>
                            </button>
                        </div>
                        {instructions.length > 0 && instructions.map((instruction, index)=>(
                            <div className="p-2 rounded-md border-b-[1px] border-primary mb-5 max-w-[90%] max-h-[300px] overflow-hidden">
                                <CgClose 
                                    size={20} 
                                    onClick={()=>setInstructions(instructions.filter((_, i) => i !== index))}
                                    className="cursor-pointer"
                                />
                                <span key={index} className="break-all">{instruction}</span>
                            </div>
                        ))}

                        <p className="font-light italic">Descrição</p>
                        <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                            <PiBookOpenTextLight className="text-primary" size={25}/>
                            <textarea
                                className="focus:outline-none max-w-[90%] min-w-[90%] max-h-[100px] min-h-[50px] text-sm italic" 
                                placeholder="Descrição"
                                minLength={6}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            className={"bg-primary text-white p-2 rounded-md mt-5 " + (isLoading ? "cursor-not-allowed" : "cursor-pointer") + ""}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loading size={20}/> : "Salvar"}
                        </button>
                    </div>
                </form> 
        </>
    )
}