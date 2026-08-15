import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { getProdutoById } from "../../services/api";
import type { ProdutoTypes } from "../../types/ProdutoTypes";
import { useCarrinho } from "../../hooks/useCarrinho";

export default function ProdutoDetalhe(){
    const  [ produto, setProduto ] = useState<ProdutoTypes | null>(null)
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        getProdutoById(Number(id)).then(data => {
            setProduto(data)
        })
    }, [])
    
    const { adicionarItem } = useCarrinho();

    if(!produto){
        return(
            <div>
                <h2 className="text-2xl font-semibold mb-3">Produto não encontrado</h2>
                <p className="mb-6">O item que você procurou pode ter sido removido ou não existe.</p>
                <Button text="Voltar para produtos" onClick={() => navigate(-1)} />
            </div>
        )
    }

    return(
        <div className="min-h-[calc(100vh-110px)] bg-gray-50 flex flex-col items-center px-4 py-10">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-indigo-700 mb-4">
                    {produto?.nome}
                </h1>
                <div className="text-gray-600 mb-6">
                    <p className="text-lg mb-2">
                        {produto?.descricao}
                    </p>
                    <p
                        className="text-xl font-semibold text-indigo-600"
                    >
                        R$ {produto.preco.toFixed(2)}
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button
                        text="Comprar"
                        onClick={()  => {
                            adicionarItem({
                                produtoId: produto.id,
                                nome: produto.nome,
                                preco: produto.preco,
                                quantidade: 1
                            })
                            navigate('/dashboardlayout/carrinho')
                        }}
                    />
                    <Button
                        text="Voltar para página de produtos"
                        onClick={() => navigate(-1)}
                    />
                </div>
                <p className="mt-10 text-sm text-gray-400 text-center">
                    <em>URL atual</em> {location.pathname + location.search}
                </p>
            </div>
        </div>
    )
}