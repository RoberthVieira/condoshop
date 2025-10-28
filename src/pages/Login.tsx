import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "../types/LoginSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";

export default function Login(){
    const {login} = useAuth();
    const navigate = useNavigate();

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

        navigate('/dashboardlayout')
    }

    return(
        <div className="">
            <h1>CondoShop</h1>
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
                
                <Button
                    text="Entrar"
                    type="submit"
                />

                {erro && <span>{erro}</span>}
            </form>
            <div>
                <Button
                    text="Voltar para a pagina inicial"
                    onClick={() => navigate('/')}
                />
            </div>
            <Footer/>
        </div>
    )
}