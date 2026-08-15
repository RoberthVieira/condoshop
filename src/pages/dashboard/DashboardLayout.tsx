import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useCarrinho } from "../../context/CarrinhoContext";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

export default function DashboardLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {logout} = useAuth();

    const { itens } = useCarrinho();
    const totalitens = itens.reduce((acc, item) => acc + item.quantidade, 0)

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header className="md:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center relative z-50">
                <h3 className="text-xl font-bold text-indigo-700">
                    Dashboard
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 text-2xl focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className={`bg-white shadow-lg border-r border-gray-100 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out z-40
                        md:static md:w-64 md:translate-x-0 
                        fixed top-16 right-4 w-48 rounded-lg
                        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 md:opacity-100"}
                    `}>
                    <div>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-6 hidden md:block">
                            Condoshop
                        </h3>
                        <nav className="space-y-4">
                            <ul className="space-y-3">
                                <li>
                                    <Link to="" className="block text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link to="produto" className="block text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>
                                        Loja de Produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="perfil" className="block text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>
                                        Perfil do Usuário
                                    </Link>
                                </li>
                                <li>
                                    <Link to="carrinho" className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsOpen(false)}>
                                        🛒 Carrinho
                                        {totalitens > 0 && (
                                            <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                                {totalitens}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    
                    {/* botão sair fixo no final */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <Button text="Sair" onClick={logout} />
                    </div>
                </aside>
            
                <main className="flex-1 overflow-auto p-4">
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
    )
}