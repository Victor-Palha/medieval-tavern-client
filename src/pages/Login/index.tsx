import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useContext, useState } from "react";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";
import { authContext } from "../../context/AuthContext";

export function Login(){
    const {handleAuth} = useContext(authContext)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleUserLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(email.length < 3 || password.length < 6){
            toast.warn("Preencha todos os campos corretamente");
            return;
        }
        setIsLoading(true);
        await api.post("/signin", {
            email,
            password
        })
        .then((response) => {
            localStorage.setItem("@mt:client", response.data.token);
            toast.success("Login efetuado com sucesso! Redirecionando...");
            handleAuth(true);
            setTimeout(()=>{
                window.location.href = "/";
            }, 2000)
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err.data.message || "Erro ao efetuar login");
            return;
        })
        .finally(()=>setIsLoading(false));

    }

    return (
        <>
            <Header />
            <form 
                className="flex flex-col m-5 justify-center items-center gap-4" 
                onSubmit={(e)=>handleUserLogin(e)}
            >
                <h1 className="font-bold text-2xl">Faça login</h1>
                <div className="flex flex-col gap-2 w-[300px] md:w-[500px]">
                    <p className="font-light italic">Email</p>
                    <div className="flex items-center border-none rounded-lg p-2 bg-white gap-2">
                        <HiOutlineMail className="" size={25}/>
                        <input 
                            type="email" 
                            className="focus:outline-none w-[80%]" placeholder="Email"
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
                        {isLoading ? <Loading size={20}/> : "Entrar"}
                    </button>
                    <span className="text-center">
                        Não tem uma conta? <Link to="/cadastro" className="text-primary">Cadastre-se</Link>
                    </span>
                </div>
            </form>
        </>
    )
}