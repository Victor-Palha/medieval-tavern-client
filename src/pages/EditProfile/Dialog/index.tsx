import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { api } from '../../../config/axios';
import { Loading } from '../../../components/Loading';
// import { Cross2Icon } from '@radix-ui/react-icons';

type EditProfilePhotoProps = {
    handleNewProfileImage({ id, url }: {id: string, url:string}): void
}

function EditProfilePhoto({handleNewProfileImage}: EditProfilePhotoProps){
    const [imageOptions, setImageOptions] = useState<{id: string, url: string}[]>([])
    const [isLoadingImages, setIsLoadingImages] = useState(true)
    const [imageSelected, setImageSelected] = useState<{id: string, url: string}>({id: "", url: ""})

    async function handleFetchImages(){
        setIsLoadingImages(true)
        const response = await api("/imgs")
        setImageOptions(response.data)
        setIsLoadingImages(false)
    }

    useEffect(()=>{
        handleFetchImages()
    }, [])
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
            <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] hover:bg-primary hover:text-white transition focus:shadow-black focus:outline-none">
                Trocar foto
            </button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                Trocar foto de perfil
                </Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                Escolha uma nova foto de perfil para o seu perfil.
                </Dialog.Description>
                <fieldset className="mb-[15px] flex justify-center flex-wrap items-center gap-5">
                    {isLoadingImages ? <Loading /> : imageOptions.map((image, index) => (
                        <label 
                            key={index} 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={()=>setImageSelected(image)}
                        >
                            <input type="radio" name="image" value={image.id}/>
                            <img src={image.url} alt={`Imagem ${index}`} className="w-[70px] h-[70px] rounded-full" />
                        </label>
                    ))}
                </fieldset>
                <div className="mt-[25px] flex justify-end">
                <Dialog.Close asChild>
                    <button 
                        className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                        onClick={()=>handleNewProfileImage(imageSelected)}    
                    >
                    Escolher imagem
                    </button>
                </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                <button
                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                >
                    <IoCloseOutline />
                </button>
                </Dialog.Close>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
)};

export default EditProfilePhoto;