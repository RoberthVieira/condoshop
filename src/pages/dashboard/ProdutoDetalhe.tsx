import { useParams, useLocation, useNavigate } from "react-router-dom";
import { listaProdutos } from "../../services/ListaProdutos";
import Button from "../../components/Button";

export default function ProdutoDetalhe(){
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const produto = listaProdutos.find(p => p.id === Number(id))

    return(
        <div>
            <h1>
                {produto?.nome}
            </h1>
            <p>
                {produto?.descricao}
            </p>
            <div>
                <Button
                    text="Comprar"
                />
                <Button
                    text="Voltar para pagina de produtos"
                    onClick={() => navigate(-1)}
                />
            </div>
            <p><em>URL atual</em> {location.pathname + location.search}</p>
        </div>
    )
}