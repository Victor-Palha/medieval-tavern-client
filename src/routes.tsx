import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
export function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/receitas" element={<Recipes/>}/>
            </Routes>
        </BrowserRouter>
    )
}