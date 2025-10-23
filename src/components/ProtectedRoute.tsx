import type { ProtectedRouteProps } from "../types/protectedroute";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({children}: ProtectedRouteProps){
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    if(!isAuthenticated()){
        return <button onClick={() => navigate('/')}>
            Voltar a pagina principal
        </button>
    }

    return children;
}