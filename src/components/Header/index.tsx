import { useContext, useState } from 'react';
import logo from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { GoSignOut } from "react-icons/go";
import { PiPlusCircleLight } from "react-icons/pi";

export function Header(){
    const {auth, userInformation, handleLogout} = useContext(authContext)
    const [sideMenu, setSideMenu] = useState(false);

    return (
        <>
        <header className="bg-primary shadow-md">
            <div className="container mx-auto p-5 flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-20 lg:w-30"/>
                </Link>
                <nav className=''>
                    <RxHamburgerMenu 
                        className="lg:hidden cursor-pointer" 
                        size={40}
                        onClick={() => setSideMenu(!sideMenu)}
                    />
                    <ul className="space-x-5 hidden lg:flex text-lg items-center">
                        {/* <li>
                            <Link to="/" className="">Home</Link>
                        </li> */}
                        {!auth ? (
                            <>    
                                <li>
                                    <Link to="/login" className="">Login</Link>
                                </li>
                                <li>
                                    <Link to="/cadastro" className="">Cadastro</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={`/profile/${userInformation._id}/${userInformation.name}`}className='flex items-center gap-2'>
                                    <img 
                                        src={userInformation.image}
                                        className="w-12 h-12 rounded-full object-cover border-[2px] border-font shadow-md pointer-events-none"    
                                    />
                                    <p>{userInformation.name.split(" ")[0]}</p>
                                    </Link>
                                </li>
                                <li className='group'>
                                    <Link to="/create" className="flex items-center gap-2 group-hover:scale-105 transition">
                                        <PiPlusCircleLight size={30} className=''/>
                                        Criar
                                    </Link>
                                </li>
                                <li className='group'>
                                    <button className='flex items-center gap-2' onClick={()=>handleLogout()}>
                                        <GoSignOut size={25} className='group-hover:fill-red-500 transition'/>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
        <aside className={`
            lg:hidden
            flex flex-col gap-4
            z-10
            ${sideMenu ? 'right-0 w-[300px] absolute h-screen top-[7.5rem]' : 'right-[-300px] w-0 absolute h-0'}
            pl-[40px] pr-[30px]
            bg-primary
            transition-all
            duration-700`
        }>
                    <ul className={`flex flex-col items-center space-y-7 text-lg ${!sideMenu && "hidden"}`}>
                        {/* <li>
                            <Link to="/" className="">Home</Link>
                        </li> */}
                        {!auth ? (
                        <>
                            <li>
                                <Link to="/login" className="">Login</Link>
                            </li>
                            <li>
                                <Link to="/cadastro" className="">Cadastro</Link>
                            </li>
                        </>
                        ) : (
                            <>
                                <li>
                                    <Link to={`/profile/${userInformation._id}/${userInformation.name}` } className='flex items-center gap-2'>
                                    <img 
                                        src={userInformation.image}
                                        className="w-10 h-10 rounded-full object-cover border-[2px] border-font shadow-md pointer-events-none"    
                                    />
                                    <p>{userInformation.name.split(" ")[0]}</p>
                                    </Link>
                                </li>
                                <li className='group'>
                                    <Link to="/create" className="flex items-center gap-2 group-hover:scale-105 transition">
                                        <PiPlusCircleLight size={30} className=''/>
                                        Criar
                                    </Link>
                                </li>
                                <li className='group '>
                                    <button className='flex items-center gap-2 group-hover:text-red-500 transition text-sm'  onClick={()=>handleLogout()}>
                                        <GoSignOut size={15} className='group-hover:fill-red-500 transition'/> Sair
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
        </aside>
        </>
    )
} 