import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center mt-16 items-center bg-gray-50 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
                Bem-vindo ao CondoShop!
            </h1>

            <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-2xl">
                No CondoShop, você encontra tudo o que precisa sem precisar sair de casa.
            </p>
            <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-2xl">
                São produtos e serviços pensados especialmente para os moradores do seu condomínio — com praticidade, segurança e rapidez.
            </p>
            <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl">
                Faça suas compras online agora mesmo, receba no conforto do seu lar e aproveite os benefícios exclusivos de ser morador.
            </p>
            
            <Button
                onClick={() => navigate('/login')}
                text="Ir para pagina de Login"
            />
        </div>
    )
}