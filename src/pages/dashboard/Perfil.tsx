import { useAuth } from "../../hooks/useAuth";

export default function Perfil(){
    const {getUserName, isAuthenticated} = useAuth();

    const namaUser = getUserName();
    const autenticado = isAuthenticated();

    return(
        <div>
            {autenticado && (
                <h1>Bem-vindo ao seu perfil {namaUser}</h1>
            )}
        </div>
    )
}