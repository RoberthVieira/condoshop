import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/api";

export function useAuth(){
    const navigate =  useNavigate();

    async function login(email: string, senha: string): Promise<boolean> {
        try{
            const data = await loginApi(email, senha)

            localStorage.setItem('token', data.token)
            localStorage.setItem('morador', JSON.stringify(data.morador))
            return true
        } catch {
            return false
        }
    }

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("morador");
        navigate('/login');
    };

    function isAuthenticated(): boolean  {
        return !!localStorage.getItem("token")
    }

    function getMorador() {
        const morador = localStorage.getItem('morador');
        return morador ? JSON.parse(morador) : null
    }

    return{login, logout, isAuthenticated, getMorador};
}