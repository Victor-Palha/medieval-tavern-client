import { useContext, useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { authContext } from "../../context/AuthContext";
import { PiUserCircle, PiBookOpenTextLight } from "react-icons/pi";
import { Loading } from "../../components/Loading";
import EditProfilePhoto from "./Dialog";
import { api } from "../../config/axios";
import { toast } from "react-toastify";

type ProfileImage = {
    id: string;
    url: string;
}

export function EditProfile(){
    const {userInformation, checkAuth} = useContext(authContext)
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [idProfileImage, setIdProfileImage] = useState("");

    function handleNewProfileImage({id, url}: ProfileImage){
        setProfileImage(url);
        setIdProfileImage(id);
    }

    async function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(name.length < 3 || description.length < 6){
            alert("Preencha todos os campos corretamente");
            return;
        }

        setIsLoading(true);
        await api.put(`/profile/update`, {
            name,
            description,
            image: idProfileImage
        },{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("@mt:client")}`,
            },
        })
        .then(async (response) => {
            toast.success(response.data.message);
            await checkAuth();
            window.location.href = `/profile/${userInformation._id}/${name}`
        })
        .catch((err) => {
            toast.error(err.data.message || "Erro ao atualizar perfil");
        })
        .finally(()=>setIsLoading(false));
    
    }

    useEffect(()=>{
        if(userInformation){
            setName(userInformation.name);
            setDescription(userInformation.description);
            setProfileImage(userInformation.image);
        }
    }, [userInformation])
    return (
        <>
            <header className="bg-primary">
                <nav className="flex justify-between p-4 items-center">
                    <div className="flex gap-3">
                        <button onClick={()=>history.back()}><IoArrowBackCircleOutline size={25}/></button>
                        <h1 className="text-2xl font-bold">Editar Perfil</h1>
                    </div>
                </nav>
            </header>

            <form className="flex flex-col m-5 justify-center items-center gap-4" onSubmit={(e)=>handleUpdateProfile(e)}>
                <div className="flex flex-col items-center mt-10 gap-3">
                    <img 
                        src={profileImage} 
                        alt={`foto de perfil de ${userInformation.name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-font"
                    />
                    <EditProfilePhoto handleNewProfileImage={handleNewProfileImage}/>
                </div>

                <div className="flex flex-col gap-2 w-[300px] md:w-[500px]">
                    <p className="font-light italic">Nome de usuário</p>
                    <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                        <PiUserCircle className="text-primary" size={25}/>
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