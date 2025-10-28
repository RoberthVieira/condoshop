import { listaProdutos } from "../../services/ListaProdutos";

import CardProdutos from "../../components/CardProduto";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useBuscaProdutos } from "../../hooks/useBuscaProdutos";

export default function Produtos() {

    const {
        produtoBuscado,
        setProdutoBuscado,
        produtosFiltrados,
        atualizarBuscaNaUrl
    } = useBuscaProdutos(listaProdutos);

    return (
        <div>
            <div>
                <h1>
                    Compre sem sair de casa!
                </h1>
                <p>
                    Aqui no CondoShop você encontra itens essenciais para o dia a dia com entrega rápida e exclusiva para moradores do condomínio.
                </p>
                <p>
                    Navegue pelos produtos disponíveis e aproveite a praticidade.
                </p>
            </div>

            <div>
                <Input
                    placeholder="Buscar produto..."
                    value={produtoBuscado}
                    onChange={(e) => {
                        setProdutoBuscado(e.target.value)
                        atualizarBuscaNaUrl(e.target.value)
                    }}
                />
                <Button
                    type="button"
                    text="Buscar"
                />
            </div>

            <div>
                {(produtoBuscado ? produtosFiltrados : listaProdutos).map((prod) => (
                    <CardProdutos
                        key={prod.id}
                        id={prod.id}
                        nome={prod.nome}
                        descricao={prod.descricao}
                        preco={prod.preco}
                        categoria={prod.categoria}
                    />
                ))}
            </div>
        </div>
    )
}