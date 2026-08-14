import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface CardProdutosProps {
    id: number
    nome: string
    preco: number
    descricao: string
    categoriaId: number
    imagem?: string
}

export default function CardProdutos({id, nome, preco, descricao, categoriaId, imagem}: CardProdutosProps){
    const navigate = useNavigate();
    return(
        <div 
            key={id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full sm:w-72 flex flex-col justify-between"
        >
            <div
                className="p-5"
            >
                <div className="flex justify-between items-center mb-2">
                    {imagem && (
                        <img
                            src={imagem}
                            alt={nome}
                            className="w-full h-40 object-cover rounded-t-2xl mb-3"
                        />
                    )}
                    <h3 className="text-lg font-semibold text-indigo-700">
                        {nome}
                    </h3>
                    <span className="text-sm text-gray-500 bg-indigo-50 px-2 py-1 rounded-md">
                        {categoriaId}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {descricao}
                </p>
                <p className="text-indigo-700 font-bold text-lg mb-4">
                    {preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>
            </div>
            <div className="px-5 pb-4">
                <Button
                    text="Ver mais detalhes/comprar"
                    onClick={() => navigate(`${id}`)} //ja esta dentro de "produto" por isso basta navegar pelo id
                />
            </div>
        </div>
    )
}