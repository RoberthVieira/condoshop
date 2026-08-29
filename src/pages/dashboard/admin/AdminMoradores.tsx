import { useEffect, useState } from "react";
import { atualizarMorador, criarMorador, deletarMorador, getMoradores } from "../../../services/api";

interface Morador {
    id: number
    nome: string
    email: string
    role: string
    condominioId: number
}

export default function AdminMoradores() {
    const [moradores, setMoradores] = useState<Morador[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [moradorEdit, setMoradorEdit] = useState<Morador | null>(null);
    const [mostrarForms, setMostrarForms] = useState(false);

    useEffect(() => {
        getMoradores().then(data => {
            setMoradores(data)
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
        return (
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4">👥 Moradores</h2>
                    <p className="text-gray-500 mt-1">Gerencie os moradores do condomínio</p>
                    <div>
                        <button 
                            onClick={() => { setMoradorEdit(null); setMostrarForms(true) }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                            + Novo Morador
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400 border-b border-gray-100">
                                <th className="pb-3 font-medium">Nome</th>
                                <th className="pb-3 font-medium">Email</th>
                                <th className="pb-3 font-medium">Tipo</th>
                                <th className="pb-3 font-medium">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moradores.map((morador) => (
                                <tr key={morador.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="py-3 text-gray-700 font-medium">{morador.nome}</td>
                                    <td className="py-3 text-gray-500">{morador.email}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            morador.role === 'admin'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'bg-green-100 text-green-700'
                                        }`}>
                                            {morador.role}
                                        </span>
                                    </td>
                                    <td className="py-3 flex gap-2">
                                        <button onClick={() => {setMoradorEdit(morador); setMostrarForms(true)}}
                                        className="text-indigo-500 hover:text-indigo-700 transition text-lg"
                                        >
                                            ✏️
                                        </button>
                                        <button onClick={async() => {
                                            const confirmacao = confirm(`Tem certeza que deseja remover "${morador.nome}"?`)
                                            if(!confirmacao){
                                                return
                                            }
                                            await deletarMorador(morador.id)
                                            setMoradores(moradores.filter(m =>  morador.id !== m.id))
                                        }}
                                        className="text-red-400 hover:text-red-600 transition text-lg"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {mostrarForms && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">
                            {moradorEdit ? 'Editar Morador' : 'Novo Morador'}
                        </h3>

                        <form onSubmit={async  (e) => {
                            e.preventDefault()
                            const formData  = new FormData(e.currentTarget)

                            const dados = {
                                nome: formData.get('nome') as string,
                                email: formData.get('email') as string,
                                senha: formData.get('senha') as string,
                                role: formData.get('role') as string,
                                condominioId: 1
                            }

                            if(moradorEdit){
                                await atualizarMorador(moradorEdit.id, dados)
                            } else {
                                await criarMorador(dados)
                            }

                            setMostrarForms(false)
                            setMoradorEdit(null)

                            const data = await getMoradores();
                            setMoradores(data);
                        }} className="flex flex-col gap-4">
                        
                            <input 
                                type="text"
                                name="nome"
                                defaultValue={moradorEdit?.nome || ''}
                                placeholder="Nome"
                                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400" 
                            />

                            <input 
                                type="text" 
                                name="email"
                                defaultValue={moradorEdit?.email || ''}
                                placeholder="Email"
                                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                            />

                            <input
                                name="senha" 
                                type="text"
                                placeholder={moradorEdit ? 'Nova senha (opcional)' : 'Senha'} 
                                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                            />

                            <select 
                                name="role"
                                defaultValue={moradorEdit?.role || 'morador'}
                                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
                            >
                                <option value="morador">Morador</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="flex gap-3">
                                <button type="submit"
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition" 
                                >
                                    Salvar
                                </button>
                                <button type="button" onClick={() => {
                                    setMostrarForms(false)
                                    setMoradorEdit(null)
                                }}
                                    className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}