import { useNavigate } from "react-router-dom"
import Button from "./Button";

export default function AdminRoute({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();
    const morador = JSON.parse(localStorage.getItem('morador') || '{}');

    if(!morador || morador.role !== 'admin') {
        return (
            <Button 
                onClick={() => navigate('/')}
                text="Voltar a pagina principal"
            />
        )
    }

    return children

}