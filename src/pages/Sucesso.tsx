import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Sucesso() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboardlayout')
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
            <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full">
                <p className="text-6xl mb-6">🎉</p>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Compra realizada!</h1>
                <p className="text-gray-500 mb-6">
                    Seu pagamento foi confirmado com sucesso. Em breve você receberá seu pedido.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                    Você será redirecionado automaticamente em 5 segundos...
                </p>
                <button
                    onClick={() => navigate('/dashboardlayout')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Voltar para a loja
                </button>
            </div>
        </div>
    )
}