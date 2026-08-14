import CardProdutos from "../../components/CardProduto";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { useBuscaProdutos } from "../../hooks/useBuscaProdutos";

export default function Produtos() {

    const {produtos, busca, setBusca} = useBuscaProdutos()

    return (
        <div className="flex flex-col items-center justify-center px-6 py-10 max-w-6xl mx-auto">
            <div 
                className="text-center mb-10"
            >
                <h1 className="text-3xl font-bold text-blue-600 mb-3">
                    Compre sem sair de casa!
                </h1>
                <p className="text-gray-700 mb-1">
                    Aqui no CondoShop, você encontra itens essenciais para o dia a dia com entrega rápida e exclusiva para moradores do condomínio.
                </p>
                <p className="text-gray-600">
                    Navegue pelos produtos disponíveis e aproveite a praticidade.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full max-w-md">
                <Input
                    placeholder="Buscar produto..."
                    value={busca}
                    onChange={(e) => {
                        setBusca(e.target.value)
                    }}
                />
                <Button
                    type="button"
                    text="Buscar"
                />
            </div>

            <div
                className="grid gap-8 w-full sm:grid-cols-2 lg:grid-cols-3"
            >
                {produtos.map((prod) => (
                    <CardProdutos
                        key={prod.id}
                        id={prod.id}
                        nome={prod.nome}
                        descricao={prod.descricao}
                        preco={prod.preco}
                        categoriaId={Number(prod.categoriaId)}
                        imagem={prod.imagem}
                    />
                ))}
            </div>
        </div>
    )
}