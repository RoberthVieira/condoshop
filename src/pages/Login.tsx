import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "../types/LoginSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login(){
    const {login} = useAuth();
    const navigate = useNavigate();
    const [erro, setErro] = useState<string|null>(null);

    const { register, handleSubmit } = useForm<LoginData>({
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
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-900 flex-col items-center justify-center px-12 text-white text-center">
                <p className="text-7xl mb-6">🛒</p>
                <h1 className="text-4xl font-bold mb-4">CondoShop</h1>
                <p className="text-indigo-200 text-lg max-w-sm">
                    O mercadinho do seu condomínio, agora no seu celular.
                </p>

                <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-xs text-left">
                    {[
                        { emoji: '🥛', label: 'Laticínios' },
                        { emoji: '🥩', label: 'Carnes' },
                        { emoji: '🧴', label: 'Higiene' },
                        { emoji: '🧹', label: 'Limpeza' },
                        { emoji: '🥤', label: 'Bebidas' },
                        { emoji: '🍫', label: 'Snacks' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                            <span className="text-xl">{item.emoji}</span>
                            <span className="text-sm font-medium text-indigo-100">{item.label}</span>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-indigo-300 text-sm">
                    Compre sem sair de casa 🏠
                </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gray-50">
                <div className="lg:hidden text-center mb-8">
                    <p className="text-5xl mb-2">🛒</p>
                    <h1 className="text-3xl font-bold text-indigo-600">CondoShop</h1>
                </div>

                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Bem-vindo de volta!</h2>
                        <p className="text-gray-500 text-sm mt-1">Entre com seus dados pra acessar o sistema</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <Input
                                type="text"
                                placeholder="seu@email.com"
                                {...register("email")}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Senha</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                {...register("senha")}
                            />
                        </div>

                        {erro && (
                            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                                {erro}
                            </p>
                        )}

                        <Button text="Entrar" type="submit" />

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-sm text-gray-400 hover:text-gray-600 transition text-center"
                        >
                            ← Voltar para a página inicial
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-gray-400 text-xs">© 2026 CondoShop</p>
            </div>
        </div>
    )
}