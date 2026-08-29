import { Routes, Route } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProtectedRoute from "../components/ProtectedRoute";
import Perfil from "../pages/dashboard/Perfil";
import Produtos from "../pages/dashboard/Produtos";
import ProdutoDetalhe from "../pages/dashboard/ProdutoDetalhe";
import Carrinho from "../pages/dashboard/Carrinho";
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../pages/dashboard/admin/AdminLayout";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AdminMoradores from "../pages/dashboard/admin/AdminMoradores";
import AdminProdutos from "../pages/dashboard/admin/AdminProdutos";
import { CarrinhoProvider } from "../context/CarrinhoContext";

export default function AppRoutes(){
    return(
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Route>
            
            <Route path="/login" element={<Login/>}/>

            <Route path="/dashboardlayout" element={
                <ProtectedRoute>
                    <CarrinhoProvider>
                        <DashboardLayout/>
                    </CarrinhoProvider>
                </ProtectedRoute>
            }>
                <Route index element={<DashboardHome/>}/>
                <Route path="perfil" element={<Perfil/>}/>
                <Route path="produto" element={<Produtos/>}/>
                <Route path="produto/:id" element={<ProdutoDetalhe/>}/>
                <Route path="carrinho" element={<Carrinho/>}/>
            </Route>

            <Route path="/admin" element={
                <AdminRoute>
                    <AdminLayout/>
                </AdminRoute>
            }>
                <Route index element={<AdminDashboard/>}/>
                <Route path="moradores" element={<AdminMoradores/>}/>
                <Route path="produtos" element={<AdminProdutos/>}/>
            </Route>
            
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}