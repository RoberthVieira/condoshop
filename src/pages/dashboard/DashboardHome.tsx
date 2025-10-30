export default function DashboardHome() {
    return (
        <section className='flex flex-col items-center justify-center px-6 py-16 bg-gray-50 text-center md:text-left'>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
                Bem-vindo ao seu painel de compras CondoShop!
            </h1>

            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-4">
                Aqui você pode acessar sua loja de produtos, verificar informações do
                seu perfil e acompanhar tudo o que acontece no seu condomínio de forma
                prática e segura.
            </p>

            <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
                Use o menu lateral para navegar entre as seções do painel e aproveitar
                todos os benefícios de ser um morador conectado.
            </p>

            <div className="border-t border-gray-300 pt-6 mt-4 text-gray-600 text-sm">
                <p>
                    Dica: mantenha seus dados atualizados para receber promoções e
                    informações exclusivas do seu condomínio!
                </p>
            </div>
        </section>
    )
}