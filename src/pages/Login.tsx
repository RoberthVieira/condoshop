import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "../types/LoginSchema";
import { useState } from "react";
import Input from "../components/Input";

export default function Login(){
    const {login} = useAuth();

    const [erro, setErro] = useState<string|null>(null);

    const {
        register, 
        handleSubmit,
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

     function onSubmit(data: LoginData){
        const sucesso = login(data.user, data.senha);
        if(!sucesso){
            setErro("Usuario ou senha estão incoretos!")

            setTimeout(() => {
                setErro(null)
            }, 1500)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Usuário"
                    {...register("user")}
                />

                <Input
                    type="password"
                    placeholder="Senha"
                    {...register("senha")}
                />
                
                <button 
                    type="submit"
                >
                    Entrar
                </button>

                {erro && <span>{erro}</span>}
            </form>
        </div>
    )
}