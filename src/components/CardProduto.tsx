import { useNavigate } from "react-router-dom";
import { useCarrinho } from '../context/CarrinhoContext'
import Button from "./Button";
import BtnCarrinho from "./BtnCarrinho";

interface CardProdutosProps {
    id: number
    nome: string
    preco: number
    descricao: string
    categoriaId: number
    imagem?: string
    categoriaNome?: string
} 

export default function CardProdutos({id, nome, preco, descricao, imagem, categoriaNome}: CardProdutosProps){
    const navigate = useNavigate();
    const { adicionarItem } = useCarrinho();

    return(
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
            {/* Imagem ou placeholder */}
            {imagem ? (
                <img
                    src={imagem}
                    alt={nome}
                    className="w-full h-40 object-cover"
                />
            ) : (
                <div className="w-full h-40 bg-indigo-50 flex items-center justify-center text-4xl">
                    🛍️
                </div>
            )}

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold text-indigo-700 leading-tight">
                        {nome}
                    </h3>
                    {categoriaNome && (
                        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                            {categoriaNome}
                        </span>
                    )}
                </div>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2 flex-1">
                    {descricao}
                </p>
                <p className="text-indigo-700 font-bold text-lg mb-4">
                    {preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
                <div className="flex gap-2">
                    <Button
                        text="Ver detalhes"
                        onClick={() => navigate(`produto/${id}`)}
                    />
                    <BtnCarrinho
                        onClick={() => adicionarItem({ produtoId: id, nome, preco, quantidade: 1 })}
                    />
                </div>
            </div>
        </div>
    )
}