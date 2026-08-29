import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/Button";

export default function AdminLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="bg-white shadow-lg border-r border-r-gray-100 w-64 p-4 flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                        CondoShop
                    </h3>
                    <p className="text-xs text-gray-400 mb-6">
                        Painel do Administrador
                    </p>
                    <nav className="space-y-3">
                        <Link to="" className="block text-gray-700 hover:text-indigo-600 transition">
                            📊 Dashboard
                        </Link>
                        <Link to="produtos" className="block text-gray-700 hover:text-indigo-600 transition">
                            📦 Produtos
                        </Link>
                        <Link to="moradores" className="block text-gray-700 hover:text-indigo-600 transition">
                            👥 Moradores
                        </Link>
                    </nav>
                </div>
                <div className="pt-4 border-t border-gray-100">
                    <Button text="Sair" onClick={logout}/>
                </div>
            </aside>
            <main className="flex-1 overflow-auto p-6">
                <Outlet/>
            </main>
        </div>
    )
}