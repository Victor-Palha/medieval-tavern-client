import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { Recipe } from './pages/Recipe';
import { SignUp } from './pages/Signup';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/receitas" element={<Recipes/>}/>
                <Route path="/receita/:id" element={<Recipe/>}/>
                <Route path="/cadastro" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile/:id/:name" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    )
}