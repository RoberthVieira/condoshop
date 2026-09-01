import { useNavigate } from "react-router-dom";

export default function Cancelado() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
            <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full">
                <p className="text-6xl mb-6">😕</p>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagamento cancelado</h1>
                <p className="text-gray-500 mb-6">
                    Seu pedido não foi finalizado. Você pode tentar novamente quando quiser.
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