import { useAuth } from "../../hooks/useAuth";

export default function Perfil() {
    const { getUserName, isAuthenticated } = useAuth();

    const namaUser = getUserName();
    const autenticado = isAuthenticated();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 min-h-[calc(100vh-110px)] px-4">
            <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 max-w-2xl w-full text-center">
                {autenticado ? (
                    <>
                        <h1
                            className="text-3xl font-bold text-indigo-700 mb-4"
                        >
                            Bem-vindo ao seu perfil, {namaUser}
                        </h1>
                        <p
                            className="text-gray-700 mb-6"
                        >
                            Aqui, você poderá acompanhar suas compras, atualizar informações e
                            gerenciar seu acesso ao CondoShop.
                        </p>
                    </>
                ) : (
                    <h1 className="text-2xl font-bold text-red-500 mb-4">
                        Usuário não autenticado
                    </h1>
                )}
                <span className="text-gray-600">
                    Você não possui prdoutos no seu histórico de compras
                </span>
            </div>
        </div>
    )
}