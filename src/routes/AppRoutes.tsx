import { Routes, Route } from "react-router-dom";

import Home from "../pages/About";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

export default function AppRoutes(){
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        
        <Route path="*" element={<NotFound/>}/>
    </Routes>
}