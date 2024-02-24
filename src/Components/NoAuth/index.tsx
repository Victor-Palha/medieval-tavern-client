import { useEffect, useState } from 'react'
import perfil from '../../assets/noAuth.jpeg'

export function NoAuth(){
    const [text, setText] = useState('')
    const line = "Parece que você não está logado, que tal se cadastrar ou fazer login? para explorar o mundo das receitas!"

    function write(line: string, counter = 0){
        if(counter < line.length){
            setText(line.slice(0, counter + 1))

            setTimeout(() => write(line, counter + 1), 50)
        }
    }

    useEffect(()=>{
        write(line)
    }, [])

    return (
        <div 
        className="container p-5 bg-modal rounded-lg flex mt-2 shadow-lg mx-auto w-[90%] items-center justify-around"
        >
            <div className='flex flex-col items-start gap-3'>
                <h1 className="text-4xl">Olá, viajante!</h1>
                <p className='italic'>{text}</p>
            </div>
            <img src={perfil} className='w-[100px] rounded-full border-[4px] border-font shadow-md animate-bounce-small'/>
        </div>
    )
}