import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { Recipe } from './pages/Recipe';
export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/receitas" element={<Recipes/>}/>
                <Route path="/receita/:id" element={<Recipe/>}/>
            </Routes>
        </BrowserRouter>
    )
}