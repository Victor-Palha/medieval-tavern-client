import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';

export function Header(){
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
                    <ul className="space-x-5 hidden lg:flex text-lg">
                        <li>
                            <a href="#" className="">Home</a>
                        </li>
                        <li>
                            <a href="#" className="">Login</a>
                        </li>
                        <li>
                            <a href="#" className="">Cadastro</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <aside className={`
            lg:hidden
            flex flex-col gap-4
            z-10
            ${sideMenu ? 'right-0 w-[300px] h-screen fixed top-[7.5rem]' : 'right-[-300px] w-0 absolute h-0'}
            pl-[40px] pr-[30px]
            bg-primary
            transition-all
            duration-700`
        }>
                    <ul className={`flex flex-col items-center space-y-5 text-lg ${!sideMenu && "hidden"}`}>
                        <li>
                            <a href="#" className="">Home</a>
                        </li>
                        <li>
                            <a href="#" className="">Login</a>
                        </li>
                        <li>
                            <a href="#" className="">Cadastro</a>
                        </li>
                    </ul>
        </aside>
        </>
    )
}