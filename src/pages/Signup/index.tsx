import { Header } from "../../Components/Header";
import { PiUserCircle } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useState } from "react";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import { Loading } from "../../Components/Loading";

export function SignUp(){
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(name.length < 3 || email.length < 3 || password.length < 6){
            toast.warn("Preencha todos os campos corretamente");
            return;
        }
        setIsLoading(true);
        const response = await api.post("/signup", {
            name,
            email,
            password
        })
        setIsLoading(false);

        if (response.status === 201){
            toast.success(response.data.message);
            setEmail("");
            setName("");
            setPassword("");
        } else {
            toast.error(response.data.message);
        }
    }
    return (
        <>
            <Header />
            <form className="flex flex-col m-5 justify-center items-center gap-4" onSubmit={(e)=>handleSignUp(e)}>
                <h1 className="font-bold text-2xl">Crie sua conta</h1>
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
                    <p className="font-light italic">Email</p>
                    <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                        <HiOutlineMail className="text-primary" size={25}/>
                        <input 
                            type="email" 
                            className="focus:outline-none w-[80%]" 
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <p className="font-light italic">Senha</p>
                    <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                        <CiLock className="" size={25}/>
                        <input 
                            type={isPasswordVisible ? "text" : "password"} 
                            className="w-[80%] focus:outline-none" placeholder="Senha"
                            min={6}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!isPasswordVisible && <VscEyeClosed 
                            className="cursor-pointer" 
                            size={25}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        />}
                        {isPasswordVisible && <VscEye 
                            className="cursor-pointer" 
                            size={25}
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        />}
                    </div>
                    <button 
                        className={"bg-primary text-white p-2 rounded-md mt-5 " + (isLoading ? "cursor-not-allowed" : "cursor-pointer") + ""}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loading size={20}/> : "Cadastrar"}
                    </button>
                    <span className="text-center">
                        Já tem uma conta? <Link to="/login" className="text-primary">Faça login</Link>
                    </span>
                </div>
            </form>
        </>
    )
}