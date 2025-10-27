import type { ProdutoTypes } from "../types/ProdutoTypes";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function CardProdutos({id, nome, preco, descricao, categoria}: ProdutoTypes){
    const navigate = useNavigate();
    return(
        <div key={id}>
            <div>
                <h3>
                    {nome}
                </h3>
                <span>
                    {categoria}
                </span>
            </div>
            <div>
                <p>
                    {descricao}
                </p>
                <p>
                    {preco}
                </p>
            </div>
            <Button 
                text="Ver mais detalhes/comprar"
                onClick={() => navigate(`${id}`)} //ja esta dentro de "produto" por isso basta navegar pelo id
            />
        </div>
    )
}