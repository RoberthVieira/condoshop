import { useEffect, useState } from "react";
import { getProduto, atualizarProduto, criarProdutos, deletarProduto } from "../../../services/api";

interface Produto {
    id: number
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoriaId: number
    imagem?: string
}

export default function AdminProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [produtoEdit, setProdutoEdit] = useState<Produto | null>(null);
    const [mostrarForms, setMostrarForms] = useState(false);

    useEffect(() => {
        getProduto().then(data => {
            setProdutos(data)
            setIsLoading(false)
        })
    }, [])

    if(isLoading === true){
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    } else {
        return(
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4">📦 Produtos</h2>
                    <p className="text-gray-500 mt-1">Gerencie os moradores do condomínio</p>
                    <div>
                        <button 
                            onClick={() => { setProdutoEdit(null); setMostrarForms(true) }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            Add. Produto
                        </button>
                    </div>               
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="pb-3 font-medium">Nome</th>
                                <th className="pb-3 font-medium">Preço</th>
                                <th className="pb-3 font-medium">Estoque</th>
                                <th className="pb-3 font-medium">Ações</th>
                            </tr>
                        </thead>
                        <tbody >
                            {produtos.map((produto) =>  (
                                <tr  key={produto.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="py-3 text-gray-700 font-medium">{produto.nome}</td>
                                    <td className="py-3 text-gray-500">
                                        {produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                    </td>
                                    <td className="py-3 text-gray-500">{produto.estoque}</td>
                                    <td className="py-3 flex gap-2">
                                        <button onClick={() => {setProdutoEdit(produto); setMostrarForms(true)}}
                                            className="text-indigo-500 hover:text-indigo-700 transition text-lg"
                                        >
                                            ✏️
                                        </button>
                                        <button onClick={() => {deletarProduto(produto.id)}}
                                            className="text-red-400 hover:text-red-600 transition text-lg"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        {mostrarForms && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-bold text-gray-700 mb-4">
                                    {produtoEdit ? 'Editar Produto' : 'Cadastrar Produto'}
                                </h3>

                                <form onSubmit={async(e) => {
                                    e.preventDefault();
                                    const formData  = new FormData(e.currentTarget);

                                    const dados = {
                                        nome: formData.get('nome') as string,
                                        descricao: formData.get('descricao') as string,
                                        preco: Number(formData.get('preco')),
                                        estoque: Number(formData.get('estoque')),
                                        categoriaId: Number(formData.get('categoriaId')),
                                        imagem: formData.get('imagem') as string || undefined
                                    }

                                    if(produtoEdit){
                                        await atualizarProduto(produtoEdit.id, dados)
                                    } else {
                                        await criarProdutos(dados)
                                    }

                                    setMostrarForms(false)
                                    setProdutoEdit(null)
                                    const data = await getProduto()
                                    setProdutos(data)
                                }} className="flex flex-col gap-4">
                                    <input 
                                        type="text" 
                                        name="nome" 
                                        defaultValue={produtoEdit?.nome || ''} 
                                        placeholder="Nome"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <input 
                                        type="text"     
                                        name="descricao" 
                                        defaultValue={produtoEdit?.descricao || ''} 
                                        placeholder="Descrição"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <input 
                                        type="number" 
                                        name="preco" 
                                        defaultValue={produtoEdit?.preco || ''} 
                                        placeholder="Preço"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <input 
                                        type="number" 
                                        name="estoque" 
                                        defaultValue={produtoEdit?.estoque || ''} 
                                        placeholder="Estoque"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <input 
                                        type="number" 
                                        name="categoriaId" 
                                        defaultValue={produtoEdit?.categoriaId || ''} 
                                        placeholder="Categoria ID"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <input 
                                        type="text" 
                                        name="imagem" 
                                        defaultValue={produtoEdit?.imagem || ''} 
                                        placeholder="URL da imagem (opcional)"
                                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                                    />
                                    <div className="flex gap-3">
                                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                                            Salvar
                                        </button>
                                        <button type="button" onClick={() => { setMostrarForms(false); setProdutoEdit(null) }}
                                            className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                                        >
                                            Cancelar
                                        </button>    
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}