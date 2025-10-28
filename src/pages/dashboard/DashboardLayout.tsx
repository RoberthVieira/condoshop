import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

export default function DashboardLayout() {

    const {logout} = useAuth();

    return (
        <div className="flex">
            <aside>
                <h3>
                    Dashboard
                </h3>

                <nav>
                    <ul>
                        <li>
                            <Link to="">Home</Link>
                        </li>
                        <li>
                            <Link to="produto">Loja de Produtos</Link>
                        </li>
                        <li>
                            <Link to="perfil">Perfil do Usuário</Link>
                        </li>
                    </ul>
                </nav>
                <Button
                    text="Sair"
                    onClick={logout}
                />
            </aside>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </div>
    )
}