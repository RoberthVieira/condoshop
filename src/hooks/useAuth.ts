import { useNavigate } from "react-router-dom";
import { users } from "../services/users";

export function useAuth(){
    const navigate =  useNavigate();

    function login(name: string, password: string): boolean {
        const user = users.find(  //retorna o primeiro item que atende as condições da linha abaixo
            (user) => user.name === name && user.password === password 
        )

        if(user){
            localStorage.setItem("auth", "true");
            localStorage.setItem("userName", user.name)
            return true
        }

        return false
    }

    function logout(){
        localStorage.removeItem("auth");
        localStorage.removeItem("userName");
        navigate('/login');
    };

    function isAuthenticated(): boolean  {
        return localStorage.getItem("auth") === "true"
    }

    function getUserName(): string|null{
        return localStorage.getItem("userName")
    }

    return{login, logout, isAuthenticated, getUserName};
}