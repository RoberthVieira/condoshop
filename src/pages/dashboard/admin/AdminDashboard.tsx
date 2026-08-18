import { useState, useEffect } from "react";
import { getDashboard } from "../../../services/api";

interface PedidoRecente {
    id: number
    status: string
    total: number
    morador: {
        nome: string
        email: string
    }
}

interface DadosDashboardAdmin {
    totalMoradores: number,
    totalProdutosCadastrados: number,
    totalProdutosAtivos: number,
    totalPedidos: number,
    totalVendas: number,
    pedidosRecentes: PedidoRecente[]
}

export default function AdminDashboard() {
    const [ dadosDashboard, setDadosDashboard ] = useState<DadosDashboardAdmin | null>()
    const [ isLoading, setIsLoading ] = useState(true) 

    useEffect(() => {
        getDashboard().then(data => {
            setDadosDashboard(data)
            setIsLoading(false)
        })
    }, [])
    
    if(isLoading  === true) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    } else {
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-indigo-700">📊 Dashboard</h2>
                    <p className="text-gray-500 mt-1">Bem vindo, Admin!</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-indigo-500">
                        <h4 className="text-sm text-gray-500 mb-1">👥 Moradores</h4>
                        <p className="text-3xl font-bold text-indigo-700">{dadosDashboard?.totalMoradores}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-500">
                        <h4 className="text-sm text-gray-500 mb-1">📦 Produtos</h4>
                        <p className="text-3xl font-bold text-indigo-700">{dadosDashboard?.totalProdutosCadastrados}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-500">
                        <h4 className="text-sm text-gray-500 mb-1">✅ Produtos Ativos</h4>
                        <p className="text-3xl font-bold text-indigo-700">{dadosDashboard?.totalProdutosAtivos}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-purple-500">
                        <h4 className="text-sm text-gray-500 mb-1">🛒 Total de Pedidos</h4>
                        <p className="text-3xl font-bold text-indigo-700">{dadosDashboard?.totalPedidos}</p>
                    </div>
                </div>
                <div className="bg-indigo-600 rounded-xl p-6 mb-6 text-white">
                    <h4 className="text-sm opacity-80 mb-1">💰 Total em Vendas</h4>
                    <p className="text-4xl font-bold">{dadosDashboard?.totalVendas.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <h4 className="text-lg font-bold text-gray-700 mb-4">📋 Pedidos Recentes</h4>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="pb-3 font-medium">Morador</th>
                                <th className="pb-3 font-medium">Total</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dadosDashboard?.pedidosRecentes.map((pedido) => (
                            <tr key={pedido.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="py-3 text-gray-700">{pedido.morador.nome}</td>
                                <td className="py-3 font-semibold text-indigo-700">{pedido.total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${pedido.status === 'pago'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {pedido.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}