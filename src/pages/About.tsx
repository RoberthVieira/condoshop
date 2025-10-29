export default function About(){
    return(
        <div className="flex flex-col justify-center items-center bg-gray-50 px-6 py-16 text-center">
            <div className="max-w-3xl mt-16">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
                    Sobre o CondoShop
                </h1>
                <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-2xl">
                    O CondoShop nasceu para tornar a vida dos moradores mais simples e conveniente.
                </p>
                <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-2xl">
                    Aqui, reunimos lojas e prestadores de serviço em um só lugar, para que você possa comprar com facilidade, pagar com segurança e receber tudo dentro do seu condomínio.
                </p>
                <p className="text-gray-700 text-lg md:text-xl mb-4 max-w-2xl">
                    Nosso compromisso é oferecer uma experiência prática, moderna e feita sob medida para o seu dia a dia.
                </p>
            </div>
        </div>
    )
}