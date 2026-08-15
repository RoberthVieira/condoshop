import { useCarrinho } from "../../hooks/useCarrinho";
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
        <div>
            <div>
                <h2>Carrinho</h2>
                <p>Finalize suas compras</p>
            </div>

            <div>
                {itens.map((item) => (
                    <div key={item.produtoId}>
                        <p>{item.nome}</p>
                        <p>{item.quantidade}</p>
                        <p>{item.preco}</p>
                        <Button text="Remover" onClick={() => removerItem(item.produtoId)}/>
                    </div>
                ))}
            </div>

            <div>
                <p>Total: {total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
                <Button text="Finalizar compra" onClick={finalizarCompra} />
            </div>
        </div>
    )
}