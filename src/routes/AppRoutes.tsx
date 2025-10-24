import { Routes, Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export default function AppRoutes(){
    return(
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Route>
            
            <Route path="/login" element={<Login/>}/>
            
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}