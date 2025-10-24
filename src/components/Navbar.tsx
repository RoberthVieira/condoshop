import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <header>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>Sobre o CondoShop</Link>
            </nav>
        </header>
    )
}