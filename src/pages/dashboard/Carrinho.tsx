import { useCarrinho } from "../../context/CarrinhoContext";
import { criarPedido } from "../../services/api";

export default function Carrinho() {
    const { itens, removerItem} = useCarrinho();

    const total = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)

    async function finalizarCompra() {
        const data = await criarPedido(
            itens.map(item => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade
            }))
        )
        window.location.href = data.urlPagamento
    }

    return (
        <div className="min-h-full bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-8">
                <h1 className="text-2xl md:text-3xl font-bold">🛒 Carrinho</h1>
                <p className="text-indigo-200 mt-1">Finalize suas compras</p>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8">
                {itens.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="text-lg font-medium">Seu carrinho está vazio</p>
                        <p className="text-sm mt-1">Adicione produtos na loja para começar</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-3 mb-6">
                            {itens.map((item) => (
                                <div key={item.produtoId} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.nome}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantidade}x · {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold text-indigo-700">
                                            {(item.preco * item.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                        </p>
                                        <button
                                            onClick={() => removerItem(item.produtoId)}
                                            className="text-red-400 hover:text-red-600 transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between mb-6">
                            <p className="text-lg font-bold text-gray-800">Total</p>
                            <p className="text-xl font-bold text-indigo-700">
                                {total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </p>
                        </div>

                        <button
                            onClick={finalizarCompra}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-base"
                        >
                            Finalizar compra →
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}