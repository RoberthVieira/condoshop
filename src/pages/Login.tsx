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

     async function onSubmit(data: LoginData){
        const sucesso = await login(data.email, data.senha)
        if(!sucesso) {
            setErro("Email ou senha incorretos!")
            setTimeout(() => setErro(null), 1500)
            return
        }

        const morador = JSON.parse(localStorage.getItem('morador') || '{}')

        if(morador.role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/dashboardlayout')
        }
    }

    return(
        <div className="min-h-screen flex flex-col justify-between bg-gray-50">
            <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                    <h1 className="text-6xl sm:text-5xl font-bold text-indigo-600 mb-8 sm:mb-4 text-center">
                        CondoShop
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            type="text"
                            placeholder="Usuário"
                            {...register("email")}
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
                        {erro && <span className="text-red-500 text-sm text-center">{erro}</span>}
                        <Button
                            text="Voltar para a página inicial"
                            onClick={() => navigate('/')}
                        />
                    </form>
                </div>
            </main>
            <Footer/>
        </div>
    )
}