import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

export default function DashboardLayout() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {logout} = useAuth();

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
                <aside className={`bg-white shadow-lg border-r border-gray-100 p-4 transition-all duration-300 ease-in-out z-40
                        md:static md:w-64 md:translate-x-0 
                        fixed top-16 right-4 w-48 rounded-lg
                        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 md:opacity-100"}
                    `}>
                    <h3 className="text-2xl font-bold text-indigo-700 mb-6 hidden md:block">
                        Dashboard
                    </h3>
                    <nav className="space-y-4">
                        <ul>
                            <Link
                                to=""
                                className="block text-gray-700 hover:text-indigo-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
            
                            <Link
                                to="produto"
                                className="block text-gray-700 hover:text-indigo-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Loja de Produtos
                            </Link>
            
                            <Link
                                to="perfil"
                                className="block text-gray-700 hover:text-indigo-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Perfil do Usuário
                            </Link>
                        </ul>
                    </nav>
                    <div className="mt-8">
                        <Button
                            text="Sair"
                            onClick={logout}
                        />
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