import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getPedidosMorador } from "../../services/api";

interface ItemPedido {
    id: number
    quantidade: number
    precoUnitario: number
    produto: {
        nome: string
        imagem?: string
    }
}

interface Pedido {
    id: number
    status: string
    total: number
    createdAt: string
    itens: ItemPedido[]
}

export default function Perfil() {
    const { getMorador } = useAuth();
    const morador = getMorador();
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [pedidoAberto, setPedidoAberto] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(morador?.id) {
            getPedidosMorador(morador.id).then(data => {
                setPedidos(data)
                setIsLoading(false)
            })
        }
    }, [])

    const totalGasto = pedidos
        .filter(p => p.status === 'pago')
        .reduce((acc, p) => acc + p.total, 0)

    function togglePedido(id: number) {
        setPedidoAberto(prev => prev === id ? null : id)
    }

    function formatarData(data: string) {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        })
    }

    function corStatus(status: string) {
        if(status === 'pago') return 'bg-green-100 text-green-700'
        if(status === 'pendente') return 'bg-yellow-100 text-yellow-700'
        return 'bg-gray-100 text-gray-600'
    }

    return (
        <div className="min-h-full bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-10">
                <div className="max-w-3xl mx-auto">
                    <p className="text-4xl mb-3">👤</p>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Olá, {morador?.nome}!
                    </h1>
                    <p className="text-indigo-200 mt-1">{morador?.email}</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8">
                {/* Resumo */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
                        <p className="text-3xl font-bold text-indigo-700">{pedidos.length}</p>
                        <p className="text-gray-500 text-sm mt-1">Pedidos realizados</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
                        <p className="text-3xl font-bold text-indigo-700">
                            {totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">Total gasto</p>
                    </div>
                </div>

                {/* Histórico */}
                <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Histórico de pedidos</h2>

                {isLoading ? (
                    <p className="text-gray-400 text-center py-10">Carregando...</p>
                ) : pedidos.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="font-medium">Nenhum pedido ainda</p>
                        <p className="text-sm mt-1">Suas compras aparecerão aqui</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {pedidos.map(pedido => (
                            <div key={pedido.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                {/* Linha do pedido */}
                                <button
                                    onClick={() => togglePedido(pedido.id)}
                                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 text-sm font-mono">#{pedido.id}</span>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${corStatus(pedido.status)}`}>
                                            {pedido.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">
                                            {formatarData(pedido.createdAt)}
                                        </span>
                                        <span className="font-bold text-indigo-700">
                                            {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {pedidoAberto === pedido.id ? '▲' : '▼'}
                                        </span>
                                    </div>
                                </button>

                                {/* Detalhes expandidos */}
                                {pedidoAberto === pedido.id && (
                                    <div className="border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
                                        {pedido.itens.map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div>
                                                    <p className="font-medium text-gray-700">{item.produto.nome}</p>
                                                    <p className="text-gray-400">{item.quantidade}x · {item.precoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>
                                                <p className="font-semibold text-gray-700">
                                                    {(item.quantidade * item.precoUnitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </p>
                                            </div>
                                        ))}
                                        <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-sm">
                                            <span className="text-gray-700">Total</span>
                                            <span className="text-indigo-700">
                                                {pedido.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}