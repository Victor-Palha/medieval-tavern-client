import { createContext, useEffect, useState } from "react";
import { api } from "../config/axios";
import { UserInformation } from "../@types/user";

interface AuthContextProps{
    auth: boolean | null;
    handleAuth(isUserAuth: boolean): void;
    handleLogout(): void
    checkAuth(): Promise<void>
    userInformation: UserInformation
}

export const authContext = createContext({} as AuthContextProps)

interface AuthProviderProps{
    children: React.ReactNode;
}
export function AuthProvider({children}: AuthProviderProps){
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [userInformation, setUserInformation] = useState({} as UserInformation)

    function handleAuth(isUserAuth: boolean){
        setIsAuth(isUserAuth)
    }

    function handleLogout(){
        const confirmLogout = window.confirm("Deseja realmente deslogar?")
        if(!confirmLogout) return
        localStorage.removeItem("@mt:client")
        window.location.reload()
        setIsAuth(false)
    }

    async function checkAuth(){
        const token = localStorage.getItem("@mt:client");
        if(token){
            await api.get("/auth/validate", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
                setIsAuth(true);
                setUserInformation(response.data)
            })
        } else {
            setIsAuth(false);
        }
    }

    useEffect(()=>{
        checkAuth()
    }, [isAuth])

    return (
        <authContext.Provider value={{auth: isAuth, handleAuth, userInformation, handleLogout, checkAuth}}>
            {children}
        </authContext.Provider>
    )
}