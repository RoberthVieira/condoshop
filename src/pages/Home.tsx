import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Bem-vindo ao CondoShop!</h1>

            <p>
                No CondoShop, você encontra tudo o que precisa sem precisar sair de casa.
            </p>
            <p>
                São produtos e serviços pensados especialmente para os moradores do seu condomínio — com praticidade, segurança e rapidez.
            </p>
            <p>
                Faça suas compras online agora mesmo, receba no conforto do seu lar e aproveite os benefícios exclusivos de ser morador.
            </p>
            
            <Button
                onClick={() => navigate('/login')}
                text="Ir para pagina de Login"
            />
        </div>
    )
}