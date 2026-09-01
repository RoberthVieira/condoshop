import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50">
            
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 text-white px-6 py-24 text-center">
                <p className="text-6xl mb-6">🛒</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    O mercadinho do seu condomínio
                </h1>
                <p className="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    Compre produtos essenciais sem sair de casa. Rápido, prático e exclusivo para moradores.
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition text-base"
                >
                    Entrar na loja →
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
                    O que você encontra aqui
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        { emoji: '🥤', label: 'Bebidas' },
                        { emoji: '🧊', label: 'Congelados' },
                        { emoji: '🍫', label: 'Snacks' },
                        { emoji: '🧹', label: 'Limpeza' },
                        { emoji: '🧴', label: 'Higiene' },
                        { emoji: '🌾', label: 'Mercearia' },
                        { emoji: '🥛', label: 'Laticínios' },
                        { emoji: '📦', label: 'Outros' },
                    ].map(cat => (
                        <div
                            key={cat.label}
                            className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center gap-2 hover:shadow-md transition cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            <span className="text-4xl">{cat.emoji}</span>
                            <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-indigo-50 px-6 py-16">
                <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
                    {[
                        { emoji: '⚡', title: 'Rápido', desc: 'Peça e receba sem sair do condomínio' },
                        { emoji: '🔒', title: 'Seguro', desc: 'Pagamento integrado via Stripe' },
                        { emoji: '🏠', title: 'Exclusivo', desc: 'Só para moradores do seu condomínio' },
                    ].map(f => (
                        <div key={f.title}>
                            <p className="text-4xl mb-3">{f.emoji}</p>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{f.title}</h3>
                            <p className="text-gray-500 text-sm">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center px-6 py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pronto para comprar?</h2>
                <p className="text-gray-500 mb-6">Acesse sua conta e explore o catálogo do seu condomínio.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
                >
                    Fazer login
                </button>
            </div>
        </div>
    )
}