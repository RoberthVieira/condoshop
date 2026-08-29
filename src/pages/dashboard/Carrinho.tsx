import { useCarrinho } from "../../context/CarrinhoContext";
import { criarPedido } from "../../services/api";
import Button from "../../components/Button";

export default function Carrinho() {

    const { itens, removerItem, limparCarrinho } = useCarrinho();

    const total  = itens.reduce((acumulador, item) => {
        return acumulador + (item.preco * item.quantidade)
    }, 0)

    async function finalizarCompra() {
        const data = await criarPedido(
            itens.map(item => ({
                produtoId: item.produtoId,
                quantidade: item.quantidade
            }))
        )
        limparCarrinho();
        window.location.href = data.urlPagamento
    }

return (
    <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-1">Carrinho</h2>
        <p className="text-gray-500 mb-6">Finalize suas compras</p>

        {itens.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-4">🛒</p>
                <p className="text-lg">Seu carrinho está vazio</p>
            </div>
        ) : (
            <>
                <div className="flex flex-col gap-4 mb-6">
                    {itens.map((item) => (
                        <div key={item.produtoId} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-gray-800">{item.nome}</p>
                                <p className="text-sm text-gray-500">
                                    {item.quantidade}x · {item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-bold text-indigo-700">
                                    {(item.preco * item.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </p>
                                <button
                                    onClick={() => removerItem(item.produtoId)}
                                    className="text-red-400 hover:text-red-600 transition text-sm"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-800">Total</p>
                    <p className="text-xl font-bold text-indigo-700">
                        {total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </p>
                </div>

                <div className="mt-6">
                    <Button text="Finalizar compra" onClick={finalizarCompra} />
                </div>
            </>
        )}
    </div>
)
}