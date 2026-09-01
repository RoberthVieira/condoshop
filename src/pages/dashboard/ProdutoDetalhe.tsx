import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { getProdutoById } from "../../services/api";
import type { ProdutoTypes } from "../../types/ProdutoTypes";
import { useCarrinho } from "../../context/CarrinhoContext";

export default function ProdutoDetalhe(){
    const [produto, setProduto] = useState<ProdutoTypes | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const {id} = useParams();
    const { adicionarItem } = useCarrinho();

    useEffect(() => {
        getProdutoById(Number(id)).then(data => {
            setProduto(data)
            setIsLoading(false)
        })
    }, [id])

    if(isLoading) {
        return (
            <div className="min-h-full bg-gray-50 flex items-center justify-center">
                <p className="text-gray-400 text-lg">Carregando produto...</p>
            </div>
        )
    }

    if(!produto) {
        return (
            <div className="min-h-full bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-6">
                <p className="text-5xl">📦</p>
                <h2 className="text-2xl font-bold text-gray-700">Produto não encontrado</h2>
                <p className="text-gray-500">O item pode ter sido removido ou não existe.</p>
                <Button text="← Voltar" onClick={() => navigate(-1)} />
            </div>
        )
    }

    return (
        <div className="min-h-full bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-indigo-200 hover:text-white text-sm mb-4 flex items-center gap-1 transition"
                >
                    ← Voltar
                </button>
                <h1 className="text-2xl md:text-3xl font-bold">{produto.nome}</h1>
            </div>

            {/* Conteúdo */}
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Imagem ou placeholder */}
                    {produto.imagem ? (
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-full h-64 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-indigo-50 flex items-center justify-center text-6xl">
                            🛍️
                        </div>
                    )}

                    <div className="p-6">
                        <p className="text-gray-600 text-base mb-6 leading-relaxed">
                            {produto.descricao}
                        </p>

                        <div className="flex items-center justify-between mb-8">
                            <p className="text-3xl font-bold text-indigo-700">
                                {produto.preco.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}
                            </p>
                            <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                Estoque: {produto.estoque} un.
                            </span>
                        </div>

                        <button
                            onClick={() => adicionarItem({
                                produtoId: produto.id,
                                nome: produto.nome,
                                preco: produto.preco,
                                quantidade: 1
                            })}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-base"
                        >
                            🛒 Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}