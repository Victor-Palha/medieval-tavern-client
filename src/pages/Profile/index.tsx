import { useParams } from "react-router-dom"
import { Header } from "../../Components/Header"
import { api } from "../../config/axios"
import { UserInformation } from "../../@types/user"
import { useState } from "react"

type UserProfile = {

}

export function Profile(){
    return (<></>)
}

// export function Profile(){
//     const [userProfile, setUserProfile] = useState<UserInformation>({} as UserInformation)
//     const {id, name} =  useParams()

//     async function handleUserProfile(id:string){
//         const response = await api.get(`/profile/${id}`)
//     }
//     return (
//         <>
//             <Header/>
//         </>
//     )
// }