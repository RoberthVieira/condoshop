import { useBuscaProdutos } from "../../hooks/useBuscaProdutos";
import { useEffect, useState } from "react";
import { getCategoria } from "../../services/api";
import CardProdutos from "../../components/CardProduto";
import Input from "../../components/Input";

export default function DashboardHome() {
    const [categorias, setCategorias] = useState<{id: number, nome: string}[]>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | undefined>(undefined)
    const {produtos, busca, setBusca, pagina, setPagina} = useBuscaProdutos(categoriaSelecionada)

    useEffect(() => {
        getCategoria().then(data => setCategorias(data))
    }, [])

    return (
        <div className="min-h-full bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white px-6 py-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    🛒 Bem-vindo ao CondoShop!
                </h1>
                <p className="text-indigo-100 text-base md:text-lg max-w-xl mx-auto">
                    Compre sem sair de casa. Produtos essenciais entregues no seu condomínio.
                </p>
            </div>

            {/* Busca + filtros */}
            <div className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto flex flex-col gap-3">
                    <Input
                        placeholder="🔍 Buscar produto..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setCategoriaSelecionada(undefined)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                                categoriaSelecionada === undefined
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Todos
                        </button>
                        {categorias.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoriaSelecionada(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                                    categoriaSelecionada === cat.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat.nome}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de produtos */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                {produtos.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">📦</p>
                        <p className="text-lg font-medium">Nenhum produto encontrado</p>
                        <p className="text-sm mt-1">Tente outra categoria ou termo de busca</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {produtos.map((prod) => (
                            <CardProdutos
                                key={prod.id}
                                id={prod.id}
                                nome={prod.nome}
                                descricao={prod.descricao}
                                preco={prod.preco}
                                categoriaId={Number(prod.categoriaId)}
                                imagem={prod.imagem}
                                categoriaNome={categorias.find(c => c.id === prod.categoriaId)?.nome}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => setPagina(p => p - 1)}
                    disabled={pagina === 1}
                    className="px-5 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ← Anterior
                </button>
                <span className="text-gray-500 text-sm font-medium">
                    Página {pagina}
                </span>
                <button
                    onClick={() => setPagina(p => p + 1)}
                    disabled={produtos.length < 6}
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Próxima →
                </button>
            </div>
        </div>
    )
}