import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Hero */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 text-white px-6 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Sobre o CondoShop
                </h1>
                <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto">
                    Conectando moradores à praticidade de ter um mercadinho e serviços essenciais dentro do próprio condomínio.
                </p>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p>
                        O <strong className="text-indigo-600">CondoShop</strong> nasceu para tornar a vida dos moradores mais simples e conveniente.
                    </p>
                    <p>
                        Reunimos produtos do dia a dia, lojas e prestadores de serviço em um só lugar, permitindo que você compre com facilidade, pague com segurança via Stripe e receba tudo sem sair do condomínio.
                    </p>
                    <p>
                        Nosso compromisso é oferecer uma experiência prática, moderna e feita sob medida para a rotina do seu condomínio.
                    </p>

                    {/* Botão de Chamada para Ação */}
                    <div className="pt-6 text-center border-t border-gray-100">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
                        >
                            Conhecer a loja →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}